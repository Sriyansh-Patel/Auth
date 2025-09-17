import mongoose from 'mongoose';

export const connectDb=async()=>{
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDb Connected: ${mongoose.connection.host}`);
    }
    catch(e){
        console.log('Error: ', e.message);
        process.exit(1)
    }
        }