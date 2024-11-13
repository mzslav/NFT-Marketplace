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
        immutable: true 
    },

    imageUrl: {
        type: String,
        required: true,
    },

    price: {
        type: Number,
        required: true,
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

NftSchema.pre('save', function(next) {
    if (!this.owner) {
        this.owner = this.creatorId;
    }
    next();
});


export default mongoose.model('Nft', NftSchema);