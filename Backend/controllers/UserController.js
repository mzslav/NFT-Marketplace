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