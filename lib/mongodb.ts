import mongoose from "mongoose";

let isConnected = false;
const { MONGODB_URI, DB_NAME, AUTH_SOURCE } = process.env;

const connectMongo = async () => {
  if (isConnected) {
    return;
  };

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

  isConnected = true;
}

export default connectMongo;