// app.js
import express from 'express';
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



app.post('/profile/register', registerValidation,async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    const doc = new UserModel({
        email: req.body.email,
        username: req.body.username,
        metaMaskAddress: req.body.metaMaskAddress,
        profilePicture: req.body.profilePicture,
    
    }); 
    
    const user = await doc.save();
    
    res.json(user);
});

app.post('/nft', NftValidation, (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json(errors.array());
    }
    res.json({
        success: true,
        username: user.owner, 
    });
});


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
