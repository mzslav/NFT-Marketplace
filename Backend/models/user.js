import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    
    username: {
        type: String,
        unique: true,
        required: true,
    },

    email: {
        type: String,
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

    profilePicture:String,
},
{
    timestamps: true,
},
);

export default mongoose.model('User', UserSchema);