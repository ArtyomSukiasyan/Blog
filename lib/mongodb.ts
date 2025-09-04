import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://root:example@127.0.0.1:27017/blog";

const connectMongo = async () => {
  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "blog",
      authSource: "admin",
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectMongo;