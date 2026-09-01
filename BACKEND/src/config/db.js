import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MONGODB CONNECTED SUCCESSFULLY!");
    } catch (error) {
        console.error("ERROR CONNECTING TO MONGODB", error);
        process.exit(1);
    }
}