import mongoose from "mongoose";
import { config } from "./config";

export const connectDb = async () => {
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(config.MONGO_URI || "");
    console.info("connected to MongoDB");
  } catch (error: unknown) {
    console.error("error connecting to MongoDB");
    console.error(error);
  }
};
