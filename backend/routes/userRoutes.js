import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import {
  getProfile,
  updateProfile,
} from "../controllers/userController.js";
import { upload } from "../middleware/upload.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/profile", verifyToken, getProfile);
router.put("/profile", verifyToken, updateProfile)

router.post(
  "/profile/photo",
  verifyToken,
  upload.single("photo"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      const photoUrl = `/uploads/${req.file.filename}`;

      const user = await User.findByIdAndUpdate(
        req.user.id,
        { photo: photoUrl },
        { new: true }
      ).select("-password -refreshToken");

      res.json(user);
      // console.log("FILE:", req.file);

    } catch (err) {
      console.error("PHOTO UPLOAD ERROR:", err);
      res.status(500).json({ message: "Photo upload failed" });
    }
  }
);

export default router;