import mongoose from "mongoose";
import Log from "../utils/logger";

export async function connectToDb() {
  try {
    const success = await mongoose.connect("mongodb://127.0.0.1:27017/test");
    if (success) Log.info("Db connection successful");
  } catch (err) {
    Log.error("Db connection fail");
  }
}
