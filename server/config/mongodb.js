import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB Connected Successfully ✅");
    });
    await mongoose.connect(`${process.env.MONGODB_URL}/bg-removal`);
  } catch (error) {
    console.log(error.message);
  }
};

export default connectDB;
