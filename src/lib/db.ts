import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI!;

let isConnected = false;

export async function connectDB() {
  mongoose.set("strictQuery", true);

  if (isConnected) {
    console.log("MongoDB is already connected");
    return;
  }

  try {
    await mongoose.connect(MONGO_URI, {
      dbName: "repo-reader"
    })
    isConnected = true;
    console.log("MongoDB connected")
  } catch (error) {
    console.log("MongoDB connection error:", error);
  }
}