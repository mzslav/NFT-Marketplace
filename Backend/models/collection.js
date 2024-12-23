import mongoose from "mongoose";

const CollectionSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true, // Назва колекції повинна бути унікальною
    },
    creatorId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true, // Кожна колекція повинна мати автора
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model('Collection', CollectionSchema);
