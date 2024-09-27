import mongoose from "mongoose";
import { configDotenv } from "dotenv";

configDotenv();

const connectDB =  async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("MongoDB connected");
    } catch (error) {
        console.log(error);
    }
}

export default connectDB;