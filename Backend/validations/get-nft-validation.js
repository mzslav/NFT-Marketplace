import { query } from 'express-validator';
import mongoose from 'mongoose';

export const nftGetValidation = [
    query('title', 'Title should be a valid string').optional().isString().isLength({ min: 3, max: 100 }),
    query('auctionStatus', 'Invalid auction status').optional().isIn(['active', 'completed', 'not_started']),
    query('priceMin', 'Price must be a number').optional().isNumeric(),
    query('priceMax', 'Price must be a number').optional().isNumeric(),
    query('auctionEndTime', 'Auction end time must be in ISO8601 format').optional().isISO8601()
];
