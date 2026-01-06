import User from "../models/User.js";

export const getAllUsers = async(req,res) => {
    const users = await User.find({role: {$ne: "admin"} }).select("-password");
    res.json(users);
};

export const deleteUser = async(req,res) => {
    await User.findByIdAndDelete(req.params.id);
    res.json({message: "User Deleted"});
};

export const updateUser = async(req,res) => {
    const updated = await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    ).select("-password")
    res.json(updated);
};
