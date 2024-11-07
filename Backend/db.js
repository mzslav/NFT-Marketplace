// db.js
import mongoose from 'mongoose';

const uri = 'mongodb+srv://admin:wwwwww@cluster0.jnsvk.mongodb.net/nft?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
    try {
        await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Succesful connect to MongoDB');
    } catch (error) {
        console.error('Connection error MongoDB:', error.message);
        process.exit(1); 
    }
};

export default connectDB; 
