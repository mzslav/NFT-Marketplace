import {
  express,
  jwt,
  validationResult,
  connectDB,
  registerValidation,
  NftValidation,
  UserModel,
  user,
  nft,
  NftModel,
  checkToken,
} from "../imports/index.js";

export const connectUser = async (req, res) => {
  try {
    const { metaMaskAddress } = req.body;

    let user = await UserModel.findOne({ metaMaskAddress });
    let message = "";

    if (user) {
      message = "User logged in successfully";
    } else {
      user = new UserModel({
        metaMaskAddress,
        username: metaMaskAddress,
      });
      await user.save();
      message = "New user registered successfully";
    }

    const token = jwt.sign(
      { id: user._id, metaMaskAddress: user.metaMaskAddress },
      "zhyhul",
      { expiresIn: "5h" }
    );

    return res.json({
      success: true,
      message,
      user: {
        id: user._id,
        metaMaskAddress: user.metaMaskAddress,
        username: user.username,
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error while creating or logging in user.",
    });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();

    if (!users.length) {
      return res.status(404).json({ message: "Users not found" });
    }

    return res.json({
      success: true,
      data: users,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to find users",
    });
  }
};

export const verifyToken = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, "zhyhul");

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      user: {
        id: user._id,
        metaMaskAddress: user.metaMaskAddress,
        username: user.username,
      },
    });
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export const getUserProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  try {
    const { metaMaskAddress } = req;

    const user = await UserModel.findOne({ metaMaskAddress }).select(
      "-password"
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const nfts = await NftModel.find({ owner: user._id });

    const purchases = await NftModel.countDocuments({ owner: user._id });
    const sales = await NftModel.countDocuments({
      creatorId: user._id,
      owner: { $ne: user._id },
    });

    const nftsData = nfts.map((nft) => ({
      id: nft._id,
      title: nft.title,
      releaseDate: nft.createdAt.toLocaleDateString(),
      price: nft.price ? `${nft.price} ETH` : "Not for sale",
      imageUrl: nft.imageUrl,
      description: nft.description,
      isAuction: nft.isAuctioned,
      collectionName: nft.collectionName,
      auctionStart:
        nft.auctionStatus === "active"
          ? nft.createdAt.toLocaleDateString()
          : null,
      auctionEnd: nft.auctionEndTime
        ? nft.auctionEndTime.toLocaleDateString()
        : null,
      nftStatus: nft.NftStatus,
    }));

    const response = {
      userAddress: user.metaMaskAddress,
      username: user.username,
      purchases: purchases || 0,
      sales: sales || 0,
      totalNFTs: nfts.length || 0,
      nfts: nftsData,
    };

    res.json({
      success: true,
      message: "User profile retrieved successfully",
      data: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve user profile",
    });
  }
};
