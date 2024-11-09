import { express, jwt,validationResult, connectDB, 
    registerValidation,NftValidation,UserModel,user,nft,NftModel,checkToken } from '../imports/index.js';

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

        const { title, description, creatorId, imageUrl,price,auctionStatus,auctionEndTime,owner } = req.body;
        
        const newNft = new NftModel({
            title,
            description, 
            creatorId,
            imageUrl,
            price,
            auctionStatus,
            auctionEndTime,
            owner 
        });

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