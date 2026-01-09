import User from "../models/User.js";

export const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select(
            "-password -refreshToken"
        );
        res.json(user);
    }catch(err){
        console.error("PROFILE ERROR:", err);
        res.status(500).json({ message: "Failed to fetch profile" });
    }
};

export const updateProfile = async (req, res) => {
    const { name, phone, address, photo } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { name, phone, address, photo },
        { new: true }
    ).select("-password -refreshToken");
    res.json(updatedUser)
}