import { express, jwt,validationResult, connectDB, 
    registerValidation,NftValidation,UserModel,user,nft,NftModel,checkToken } from '../imports/index.js';

    export const connectUser = async (req, res) => {
        try {
          const { metaMaskAddress } = req.body;
      
          // Перевіряємо наявність користувача з MetaMask-адресою
          let user = await UserModel.findOne({ metaMaskAddress });
          let message = '';
      
          if (user) {
            message = 'User logged in successfully';
          } else {
            // Якщо користувача немає, створюємо нового користувача з metaMaskAddress як username
            user = new UserModel({
              metaMaskAddress,
              username: metaMaskAddress, // Встановлюємо username рівним metaMaskAddress
            });
            await user.save();
            message = 'New user registered successfully';
          }
      
          // Генеруємо JWT токен
          const token = jwt.sign(
            { id: user._id, metaMaskAddress: user.metaMaskAddress },
            'zhyhul',
            { expiresIn: '5h' }
          );
      
          // Відправляємо відповідь з повідомленням та токеном
          return res.json({
            success: true,
            message,
            user: { id: user._id, metaMaskAddress: user.metaMaskAddress, username: user.username },
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
            return res.status(404).json({ message: 'Users not found' });
        }

        return res.json({
            success: true,
            data: users
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to find users'
        });
    }
};


export const verifyToken = async (req, res) => {
  try {
    const { token } = req.body;
    const decoded = jwt.verify(token, 'zhyhul'); // Використовуйте свій секретний ключ

    const user = await UserModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    return res.json({
      success: true,
      user: { id: user._id, metaMaskAddress: user.metaMaskAddress, username: user.username },
    });
  } catch (error) {
    console.error("Token verification failed:", error.message);
    res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }
};


export const getUserProfile = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors: errors.array()
      });
  }

  try {
      // Отримуємо метамаск адресу з токену
      const { metaMaskAddress } = req;

      // Знайти користувача по метамаск адресу
      const user = await UserModel.findOne({ metaMaskAddress }).select("-password"); // Вибираємо всі поля, крім пароля

      if (!user) {
          return res.status(404).json({
              success: false,
              message: 'User not found',
          });
      }

      // Отримуємо NFT, якими володіє користувач
      const nfts = await NftModel.find({ owner: user._id });

      // Підрахуємо кількість покупок, продажів і NFT користувача
      const purchases = await NftModel.countDocuments({ owner: user._id });
      const sales = await NftModel.countDocuments({ creatorId: user._id, owner: { $ne: user._id } });

      // Створюємо масив для NFT
      const nftsData = nfts.map(nft => ({
          id: nft._id,
          title: nft.title,
          releaseDate: nft.createdAt.toLocaleDateString(),
          price: nft.price ? `${nft.price} ETH` : "Not for sale",
          imageUrl: nft.imageUrl,
          description: nft.description,
          isAuction: nft.isAuctioned,
          collectionName: nft.collectionName,
          auctionStart: nft.auctionStatus === 'active' ? nft.createdAt.toLocaleDateString() : null,
          auctionEnd: nft.auctionEndTime ? nft.auctionEndTime.toLocaleDateString() : null,
          nftStatus: nft.NftStatus,
      }));

      // Створюємо відповідь
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
          message: 'User profile retrieved successfully',
          data: response,
      });
  } catch (error) {
      console.log(error);
      res.status(500).json({
          success: false,
          message: 'Failed to retrieve user profile',
      });
  }
};