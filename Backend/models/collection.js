import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    creatorId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true, 
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Collection', CollectionSchema);
