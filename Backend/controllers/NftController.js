import { express, jwt,validationResult, connectDB, 
    registerValidation,NftValidation,UserModel,user,
    nft,NftModel,checkToken,authenticateJWT } 
from '../imports/index.js';
import LogModel from '../models/log.js'

export const AddNewNft = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    try {
        const { title, description, imageUrl, price, isAuctioned, blockchainAddress, collectionId, collectionName, auctionEndTime } = req.body;

        // Перевірка на обов'язкові поля для "isAuctioned"
        if (isAuctioned && !auctionEndTime) {
            return res.status(400).json({
                success: false,
                message: 'Auction end time is required for auctioned NFTs'
            });
        }

        // Додавання нового NFT
        const nftData = {
            title,
            description,
            imageUrl,
            price: price || 0, // Якщо ціна не передана, встановимо її як 0
            isAuctioned,
            blockchainAddress,
            collectionName,
            collectionId,
            owner: req.userId, // Власник отримує userId
            creatorId: req.userId, // Тепер creatorId дорівнює owner
            NftStatus: req.body.NftStatus || 'created',
            auctionEndTime: isAuctioned ? auctionEndTime : undefined,
        };

        const newNft = new NftModel(nftData);
        let nft = await newNft.save();

        // Логування операції, додаємо operationPrice, навіть якщо це 0
        const logData = {
            nftID: nft._id,
            transactionDate: new Date(),
            operationPrice: price || 0, // Якщо ціна не передана, встановимо її як 0
        };

        const newLog = new LogModel(logData);
        let log = await newLog.save();

        // Оновлення NFT з посиланням на новий запис в Log
        nft.transactionHistory = log._id;
        await nft.save();

        res.json({
            success: true,
            message: 'NFT added successfully',
            nft
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Failed to add NFT'
        });
    }
};


export const GetNftInfo = async (req,res) => {
    try {
 
        const id = req.body.id || req.params.id || req.query.id;
        if (!id) {
            return res.status(400).json({ message: 'Id parameter is required' });
        }


        // Шукаємо NFT по назві (регулярний вираз для нечутливого до регістру пошуку)
        const nft = await NftModel.findById(id)
        .populate('creatorId', 'username')
        .populate('owner', 'username');


        if (!nft) {
            return res.status(404).json({ message: 'NFT not found' });
        }

        // Повертаємо знайдений NFT
        return res.json({
            success: true,
            data: nft
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch NFT'
        });
    }
};


export const GetAllNFT = async (req, res) => {
    const { sort = 'createdAt', sortOrder = 'asc', creatorNickname } = req.query;
    
    const findPrice = req.query.price ? parseFloat(req.query.price) : null;
    if (findPrice && isNaN(findPrice)) {
        return res.status(400).json({ message: 'Invalid price value' });
    }
    

    try {
        let filter = {};

        // Пошук по імені користувача
        if (creatorNickname) {
            const user = await UserModel.findOne({ username: creatorNickname });
            if (!user) {
                return res.status(404).json({ message: 'Creator not found' });
            }
            filter.creatorId = user._id;
        }

        // Фільтрація за ціною
        if (findPrice) {
            filter.price = { $lte: findPrice }; // Додаємо умову для ціни
        }

        // Пошук NFT за фільтром
        const nfts = await NftModel.find(filter)
            .sort({ [sort]: sortOrder })
            .populate('creatorId', 'username'); 

        if (!nfts.length) {
            return res.status(404).json({ message: 'NFTs not found' });
        }

        return res.json({
            success: true,
            data: nfts
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch NFTs'
        });
    }
};


export const buyNft = async (req,res) => {
    try {
 
        const NFTid = req.body.id || req.params.id || req.query.id;
        if (!NFTid) {
            return res.status(400).json({ message: 'Id parameter is required' });
        }

        const nft = await NftModel.findById(NFTid);

        if (!nft) {
            return res.status(404).json({ message: 'NFT not found' });
        }

        const buyerId = req.userId;


        if (buyerId) {
            nft.owner = buyerId;

            }

            await nft.save();


        return res.json({
            success: true,
            message: "NFT purchased successfully",
            data: nft
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Failed to fetch NFT'
        });
    }
};
