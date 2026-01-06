import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "./models/User.js";
import dotenv from "dotenv";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const adminExists = await User.findOne({role: "admin"});

if(!adminExists){
    const password = await bcrypt.hash("admin123", 10);

    await User.create({
    name: "Admin",
    email: "admin@gmail.com",
    password,
    role: "admin",
  });

  console.log("Admin created");

}else{
    console.log("Admin already exists")
}

process.exit();