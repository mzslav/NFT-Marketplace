import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        unique: true,
    },

    email: {
        type: String,
        required: false,
        unique: true,
    },

    metaMaskAddress: {
        type: String,
        required: true,
        unique: true,
    },
    balance: {
        type: Number,
        default: 0,
    },
    ownedNFTs: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Nft',
    },
    purchaseLog: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Log',  
        required: true,
    },

    profilePicture:String,
},
{
    timestamps: true,
},
);

export default mongoose.model('User', UserSchema);