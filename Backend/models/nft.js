import mongoose from "mongoose";

const NftSchema = new mongoose.Schema({
    
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
        required: true,
    },

    creatorId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true,
    },

    imageUrl: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
    },

    auctionStatus: {
        type: String, 
        enum: ['active', 'completed', 'not_started'],  
        required: true,
    },

    auctionEndTime: {
        type: Date,
        required: true,
    },

    owner: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
        required: true,
    },

},

{
    timestamp: true,
},
);

export default mongoose.model('Nft', NftSchema);