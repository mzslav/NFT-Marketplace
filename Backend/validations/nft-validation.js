import { body } from "express-validator";
import User from "../models/user.js";
import mongoose from "mongoose";

export const NftValidation = [

    body('title','Min length must be 5 and max 20').isLength({ min: 5}).isLength({ max: 20}),
    body('description','max lenght is 100').isLength({ max: 100}),
    body('creatorId','creator Id not found')
    .custom((value) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
            throw new Error('Invalid creator ID');
        }      
        return User.findById(value).then(user => {
            if (!user) {
                return Promise.reject('User not found');
            }
        });
    }),

    body('imageUrl','image URL not found').isURL(),

    body('price','not real price').isNumeric(),


    



]