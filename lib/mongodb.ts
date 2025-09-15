import mongoose from "mongoose";

const { MONGODB_URI, DB_NAME, AUTH_SOURCE } = process.env;

const connectMongo = async () => {
  try {
    await mongoose.connect(MONGODB_URI as string, {
      dbName: DB_NAME,
      authSource: AUTH_SOURCE,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    throw error;
  }
};

export default connectMongo;