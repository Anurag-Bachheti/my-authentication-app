import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken"
import {
    register,
    login,
    refreshAccessToken,
    logout
} from "../controllers/authController.js";
import {
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshAccessToken);
router.post("/logout", logout);
router.get(
    "/google",
    passport.authenticate("google", {
        scope: ["profile", "email"],
        prompt: "select_account",
    })
);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

router.get(
    "/google/callback",
    passport.authenticate("google", { session: false }),
    (req, res) => {
        const user = req.user;

        const accessToken = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "30s" }
        );

        let refreshToken = null;

        if (user.role === "admin") {
            refreshToken = jwt.sign(
                { id: user._id },
                process.env.REFRESH_SECRET,
                { expiresIn: "7d" }
            );
            user.refreshToken = refreshToken;
            user.save();
        }

        const redirectUrl =
            "http://localhost:5173/oauth-success" +
            `?accessToken=${accessToken}` +
            (refreshToken ? `&refreshToken=${refreshToken}` : "") +
            `&user=${encodeURIComponent(
                JSON.stringify({
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role,
                })
            )}
    `;

        res.redirect(redirectUrl);
    }
);

export default router;