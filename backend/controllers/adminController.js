import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const getAllUsers = async(req,res) => {
    const users = await User.find({role: {$ne: "admin"} }).select("-password");
    res.json(users);
};

export const createUser = async(req,res) => {
    const { name, email, role, password } = req.body;

    if (!name || !email) {
        return res.status(400).json({ message: "Name and email required" });
    }

    //prevent dublicate
    const exists = await User.findOne({ email });
    if (exists) {
        return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = password
        ? await bcrypt.hash(password, 10)
        : await bcrypt.hash("123456", 10); // default password

    const user = await User.create({
        name,
        email,
        role: role || "user",
        password: hashedPassword,
    });

    res.status(201).json({
        message: "User created",
        user: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
        },
    });
}

export const updateUser = async(req,res) => {
    const updated = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    ).select("-password")
    res.json(updated);
};

export const deleteUser = async(req,res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({message: "User Deleted"});
};

