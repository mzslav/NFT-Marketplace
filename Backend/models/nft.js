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
        immutable: true 
    },

    owner: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',  
    },

    imageUrl: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
    },

    isAuctioned: {  
        type: Boolean,
        default: false,
    },

    auctionStatus: {
        type: String,
        enum: ['active', 'completed', 'not_started'],  
        default: 'not_started',
    },

    auctionEndTime: {
        type: Date,
        required: function () { return this.isAuctioned; }, 
    },

    NftStatus: {
        type: String,
        enum: ['on sale', 'sold', 'on auction', 'created'],  
        default: 'created',
    },

    blockchainAddress: {
        type: String,
    },

    transactionHistory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Log',
    },

    collectionName: { // Нове поле для зберігання назви колекції
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },

}, {
    timestamps: true,
});

NftSchema.pre('save', function(next) {
    if (!this.owner) {
        this.owner = this.creatorId;
    }
    next();
});

export default mongoose.model('Nft', NftSchema);
