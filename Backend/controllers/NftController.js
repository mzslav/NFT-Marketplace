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
  authenticateJWT,
} from "../imports/index.js";
import LogModel from "../models/log.js";
import CollectionModel from "../models/Collection.js";
import Nft from "../models/nft.js";

export const AddNewNft = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: "Validation failed",
      errors: errors.array(),
    });
  }

  try {
    const {
      title,
      description,
      imageUrl,
      price,
      isAuctioned,
      blockchainAddress,
      collectionId,
      collectionName,
      auctionEndTime,
    } = req.body;

    if (isAuctioned && !auctionEndTime) {
      return res.status(400).json({
        success: false,
        message: "Auction end time is required for auctioned NFTs",
      });
    }

    if (collectionId && collectionName) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide either collectionId or collectionName, not both.",
      });
    }

    let resolvedCollectionId = collectionId;
    let resolvedCollectionName = collectionName;

    if (collectionId) {
      const existingCollection = await CollectionModel.findById(collectionId);

      if (!existingCollection) {
        return res.status(400).json({
          success: false,
          message: "Collection with this ID does not exist",
        });
      }

      resolvedCollectionName = existingCollection.name;
    }

    if (!collectionId && collectionName) {
      const existingCollection = await CollectionModel.findOne({
        name: collectionName,
        creatorId: req.userId,
      });

      if (existingCollection) {
        return res.status(400).json({
          success: false,
          message: "Collection with this name already exists",
        });
      }

      const newCollection = new CollectionModel({
        name: collectionName,
        creatorId: req.userId,
      });

      const savedCollection = await newCollection.save();
      resolvedCollectionId = savedCollection._id;
    }

    const nftData = {
      title,
      description,
      imageUrl,
      price: price || 0,
      isAuctioned,
      blockchainAddress,
      collectionName: resolvedCollectionName,
      collectionId: resolvedCollectionId,
      owner: req.userId,
      creatorId: req.userId,
      NftStatus: req.body.NftStatus || "created",
      auctionEndTime: isAuctioned ? auctionEndTime : undefined,
    };

    const newNft = new NftModel(nftData);
    let nft = await newNft.save();

    res.json({
      success: true,
      message: "NFT added successfully",
      nft,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Failed to add NFT",
    });
  }
};

export const GetNftInfo = async (req, res) => {
  try {
    const id = req.body.id || req.params.id || req.query.id;
    if (!id) {
      return res.status(400).json({ message: "Id parameter is required" });
    }

    const nft = await NftModel.findById(id)
      .populate("creatorId", "username")
      .populate("owner", "username");

    if (!nft) {
      return res.status(404).json({ message: "NFT not found" });
    }

    return res.json({
      success: true,
      data: nft,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch NFT",
    });
  }
};

export const GetAllNFT = async (req, res) => {
  const { sort = "createdAt", sortOrder = "asc", creatorNickname } = req.query;

  const findPrice = req.query.price ? parseFloat(req.query.price) : null;
  if (findPrice && isNaN(findPrice)) {
    return res.status(400).json({ message: "Invalid price value" });
  }

  try {
    let filter = {};

    if (creatorNickname) {
      const user = await UserModel.findOne({ username: creatorNickname });
      if (!user) {
        return res.status(404).json({ message: "Creator not found" });
      }
      filter.creatorId = user._id;
    }

    if (findPrice) {
      filter.price = { $lte: findPrice };
    }

    const nfts = await NftModel.find(filter)
      .sort({ [sort]: sortOrder })
      .populate("creatorId", "username");

    if (!nfts.length) {
      return res.status(404).json({ message: "NFTs not found" });
    }

    return res.json({
      success: true,
      data: nfts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch NFTs",
    });
  }
};

export const buyNft = async (req, res) => {
  try {
    const NFTid = req.body.id || req.params.id || req.query.id;
    if (!NFTid) {
      return res.status(400).json({ message: "Id parameter is required" });
    }

    const nft = await NftModel.findById(NFTid);

    if (!nft) {
      return res.status(404).json({ message: "NFT not found" });
    }

    const buyerId = req.userId;

    if (buyerId) {
      nft.owner = buyerId;
    }

    await nft.save();

    return res.json({
      success: true,
      message: "NFT purchased successfully",
      data: nft,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch NFT",
    });
  }
};

export const GetAllCollection = async (req, res) => {
  try {
    const { metaMaskAddress } = req;

    const user = await UserModel.findOne({ metaMaskAddress });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const nfts = await Nft.find()
      .populate({
        path: "collectionId",
        match: { creatorId: user._id },
      })
      .exec();

    const uniqueCollections = new Set();

    const response = nfts
      .filter((nft) => nft.collectionId)
      .map((nft) => {
        if (uniqueCollections.has(nft.collectionId._id.toString())) {
          return null;
        }
        uniqueCollections.add(nft.collectionId._id.toString());

        return {
          title: nft.title,
          description: nft.description,
          imageUrl: nft.imageUrl,
          blockchainAddress: nft.blockchainAddress,
          price: nft.price,
          NftStatus: nft.NftStatus,
          collection: {
            name: nft.collectionId.name,
            creatorId: nft.collectionId.creatorId,
            collectionId: nft.collectionId._id,
          },
        };
      })
      .filter((nft) => nft !== null);

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const GetCollectionDetails = async (req, res) => {
  try {
    const { collectionId } = req.params;

    const collection = await CollectionModel.findById(collectionId);

    if (!collection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    const nfts = await NftModel.find({ collectionId }).exec();

    const collectionData = {
      id: collection._id,
      name: collection.name,
      description: collection.description,
      creator: collection.creatorId,
      nfts: nfts.map((nft) => ({
        id: nft._id,
        title: nft.title,
        price: nft.price,
        imageUrl: nft.imageUrl,
        owner: nft.owner,
      })),
    };

    res.status(200).json(collectionData);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
