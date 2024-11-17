import { body } from "express-validator";
import User from "../models/user.js";
import mongoose from "mongoose";

export const NftValidation = [

    body('title','Min length must be 5 and max 20').isLength({ min: 5}).isLength({ max: 20}),
    body('description','max lenght is 100').isLength({ max: 100}),


    body('imageUrl','image URL not found').isURL(),

    body('price','not real price').isNumeric(),

    
    body('isAuctioned')
        .isBoolean().withMessage('isAuctioned must be a boolean value')
        .custom((value, { req }) => {
            if (value === true) {
                // Якщо NFT виставлений на аукціон, перевіряємо інші параметри
                if (!req.body.auctionEndTime) {
                    throw new Error('Auction end time is required when isAuctioned is true');
                }
                if (!req.body.auctionStatus || req.body.auctionStatus !== 'active') {
                    throw new Error('Auction status must be set to "active" when isAuctioned is true');
                }
            }
            return true;
        }),
    body('auctionEndTime')
        .optional()
        .isISO8601().withMessage('auctionEndTime must be a valid date')
        .custom((value, { req }) => {
            if (req.body.isAuctioned && !value) {
                throw new Error('Auction end time is required when isAuctioned is true');
            }
            return true;
        }),
    body('auctionStatus')
        .optional()
        .isIn(['active', 'completed', 'not_started']).withMessage('Invalid auction status')
        .custom((value, { req }) => {
            if (req.body.isAuctioned && value !== 'active') {
                throw new Error('Auction status must be "active" when isAuctioned is true');
            }
            return true;
        }),




]