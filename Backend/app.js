import express from 'express';
import jwt from 'jsonwebtoken';
import { validationResult } from "express-validator";
import connectDB from './db.js'; 

import {registerValidation} from './validations/auth.js'
import { NftValidation } from './validations/nft-validation.js';
import UserModel from './models/user.js'
import user from './models/user.js';

connectDB();

const app = express();
const PORT = process.env.PORT || 3500;

app.use(express.json());


app.post('/nft', NftValidation, (req,res) => {
   try {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    res.json({
        success: true,
        username: user.owner, 
    });
   } catch (error) {
    console.log(eror);
    res.status(500).json({
        message: 'Cant find the nft'
    });
    
   }
});



app.post('/profile/connect', async (req, res) => {
    try {
        const { metaMaskAddress, email, username, profilePicture } = req.body;

        // Перевіряємо наявність користувача з MetaMask-адресою
        let user = await UserModel.findOne({ metaMaskAddress });

        if (user) {
            // Якщо користувач знайдений і в запиті є додаткові дані, оновлюємо профіль
            if (email || username || profilePicture) {
                user.email = email || user.email;
                user.username = username || user.username;
                user.profilePicture = profilePicture || user.profilePicture;
                await user.save();

                return res.json({
                    success: true,
                    message: 'User logged in and profile updated'
                });
            }

            // Якщо додаткових даних немає, просто логін
            return res.json({
                success: true,
                message: 'User logged in successfully'
            });
        } else {
            // Якщо користувача немає, створюємо новий із MetaMask-адресою
            const newUser = new UserModel({ metaMaskAddress, username,email});
            user = await newUser.save();

            return res.json({
                success: true,
                message: 'New user registered successfully'            
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Can't create or login user",
        });
    }
});








app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
