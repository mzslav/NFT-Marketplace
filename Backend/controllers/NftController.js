import { express, jwt,validationResult, connectDB, 
    registerValidation,NftValidation,UserModel,user,
    nft,NftModel,checkToken,authenticateJWT } 
from '../imports/index.js';


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

        const { title, description, creatorId, imageUrl,price,auctionStatus,
        auctionEndTime,userId,isAuctioned,NftStatus,blockchainAddress,transactionHistory} = req.body;
        
        if (isAuctioned && !auctionEndTime) {
            return res.status(400).json({
                success: false,
                message: 'Auction end time is required for auctioned NFTs'
            });
        }

        const nftData = {
            title,
            description,
            creatorId,
            imageUrl,
            price,
            auctionStatus,
            isAuctioned,
            auctionEndTime,
            owner: req.userId || creatorId,
            blockchainAddress,
            transactionHistory,
            NftStatus,
        };

       
        const newNft = new NftModel(nftData);

          let nft = await newNft.save();

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
        // Отримуємо параметр 'title' з запиту
        const { title } = req.body;

        // Перевіряємо, чи передано title
        if (!title) {
            return res.status(400).json({ message: 'Title parameter is required' });
        }

        // Шукаємо NFT по назві (регулярний вираз для нечутливого до регістру пошуку)
        const nft = await NftModel.findOne({ title: { $regex: title, $options: 'i' } });

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
    try {

        const nfts = await NftModel.find();

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
