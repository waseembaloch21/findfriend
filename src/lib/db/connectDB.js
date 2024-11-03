import mongoose from "mongoose";

export async function connectDB() {
    try{
        let connection = await mongoose.connect(process.env.MONGODB_URI)
        console.info("Mongodb Connected")
    }
    catch(err){
        console.log("error in connection==>",err);
        
    }
}