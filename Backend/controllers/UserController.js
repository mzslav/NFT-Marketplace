import { express, jwt,validationResult, connectDB, 
    registerValidation,NftValidation,UserModel,user,nft,NftModel,checkToken } from '../imports/index.js';

export const connectUser = async (req, res) => {
    try {
        const { metaMaskAddress, email, username, profilePicture } = req.body;

        // Перевіряємо наявність користувача з MetaMask-адресою
        let user = await UserModel.findOne({ metaMaskAddress });
        let message = '';

        if (user) {
            // Якщо користувач знайдений і в запиті є додаткові дані, оновлюємо профіль
            if (email || username || profilePicture) {
                user.email = email || user.email;
                user.username = username || user.username;
                user.profilePicture = profilePicture || user.profilePicture;
                await user.save(); 

                message = 'User logged in and profile updated';
            } else {
                message = 'User logged in successfully';
            }
        } else {
            // Якщо користувача немає, створюємо новий із MetaMask-адресою
            const newUser = new UserModel({ metaMaskAddress, username, email });
            user = await newUser.save();

            message = 'New user registered successfully';
        }

        // Генеруємо JWT токен для користувача
        const token = jwt.sign(
            { id: user._id, metaMaskAddress: user.metaMaskAddress },
            'zhyhul', 
            { expiresIn: '5h' } 
        );

        return res.json({
            success: true,
            message: message,
            ... user,
            token: token, 
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Can't create or login user",
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