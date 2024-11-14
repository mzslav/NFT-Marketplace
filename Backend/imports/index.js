import express from 'express';
import jwt from 'jsonwebtoken';
import { validationResult } from "express-validator";
import connectDB from '../db.js'; 

import {registerValidation} from '../validations/auth.js'
import { NftValidation } from '../validations/nft-validation.js';
import UserModel from '../models/user.js'
import user from '../models/user.js';
import nft from '../models/nft.js';
import NftModel from '../models/nft.js'
import checkToken from '../utils/checkToken.js'
import authenticateJWT from '../utils/authenticateJWT.js';

export {
    express,
    jwt,
    validationResult,
    connectDB, 
    registerValidation,
    NftValidation,
    UserModel,
    NftModel,
    nft,
    checkToken,
    authenticateJWT,
    user


};