import { body } from "express-validator";
import User from "../models/user.js";
import mongoose from "mongoose";

export const NftValidation = [

    // Перевірка на довжину заголовка
    body('title', 'Min length must be 5 and max 20').isLength({ min: 5 }).isLength({ max: 20 }),

    // Перевірка на довжину опису
    body('description', 'max length is 100').isLength({ max: 100 }),

    // Перевірка URL зображення
    body('imageUrl', 'image URL not found').isURL(),

    // Перевірка на наявність ціни (тільки якщо статус не "created")
    body('price')
        .optional()
        .isNumeric().withMessage('Price must be a numeric value')
        .custom((value, { req }) => {
            if (req.body.NftStatus !== 'created' && !value) {
                throw new Error('Price is required when NftStatus is not "created"');
            }
            return true;
        }),

    // Перевірка на наявність поля "isAuctioned" лише для "on sale" та "on auction"
    body('isAuctioned')
        .optional()
        .isBoolean().withMessage('isAuctioned must be a boolean value')
        .custom((value, { req }) => {
            if (req.body.NftStatus === 'created' && value !== undefined) {
                throw new Error('isAuctioned should not be provided when NftStatus is "created"');
            }
            if (req.body.NftStatus !== 'created' && value === undefined) {
                throw new Error('isAuctioned is required for "on sale" or "on auction" NFTs');
            }
            return true;
        }),

    // Перевірка часу завершення аукціону
    body('auctionEndTime')
        .optional()
        .isISO8601().withMessage('auctionEndTime must be a valid date')
        .custom((value, { req }) => {
            if (req.body.isAuctioned && !value) {
                throw new Error('Auction end time is required when isAuctioned is true');
            }
            return true;
        }),

    // Перевірка статусу аукціону
    body('auctionStatus')
        .optional()
        .isIn(['active', 'completed', 'not_started']).withMessage('Invalid auction status')
        .custom((value, { req }) => {
            if (req.body.isAuctioned && value !== 'active') {
                throw new Error('Auction status must be "active" when isAuctioned is true');
            }
            return true;
        }),

    // Перевірка статусу NFT (може бути created, on sale або on auction)
    body('NftStatus')
        .optional()
        .isIn(['created', 'on sale', 'on auction']).withMessage('Invalid NftStatus')
        .custom((value, { req }) => {
            // Якщо статус "created", то ціна не повинна бути передана
            if (value === 'created' && req.body.price) {
                throw new Error('Price should not be provided when NftStatus is "created"');
            }
            // Якщо статус "on sale" чи "on auction", ціна має бути передана
            if ((value === 'on sale' || value === 'on auction') && !req.body.price) {
                throw new Error('Price is required for "on sale" or "on auction" NFTs');
            }
            return true;
        }),

    // Перевірка наявності ID колекції (якщо передано)
    body('collectionId')
        .optional()
        .isMongoId().withMessage('Invalid collectionId')
];

