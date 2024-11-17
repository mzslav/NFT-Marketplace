import mongoose from "mongoose";

const LogSchema = new mongoose.Schema({
    nftID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Nft',
        required: true,
    }, 

    transactionDate:{
        type: Date,
        required: true,
    },

    operationType:{
        type: String,
        enum: ['confirm', 'decline','not_active'],  
        default: 'not_active',
    },

    operationPrice:{
        type: Number,
        required: true,
    },

},

{
    timestamp: true,
},
);


export default mongoose.model('Log', LogSchema);