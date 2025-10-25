import mongoose from "mongoose";
import { User } from "./User.js";  // named import
import { Data } from "./Data.js";  // named import

mongoose.connect("mongodb://127.0.0.1:27017/UserInfo2")
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Connection Error:", err));

async function initializeData() {
  try {
    await User.deleteMany({});
    console.log("🗑 Previous Data Deleted");

    await User.insertMany(Data);
    console.log("🎉 Demo Data Inserted Successfully");
  } catch (err) {
    console.log("❌ Error Occurred:", err);
  } finally {
    mongoose.connection.close();
  }
}

initializeData();
