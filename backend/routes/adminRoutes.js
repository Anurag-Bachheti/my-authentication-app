import express from 'express';
import { verifyToken, verifyAdmin } from '../middleware/authMiddleware.js';
import {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/adminController.js';

const router = express.Router();

router.get("/users", verifyToken, verifyAdmin, getAllUsers);
router.post("/users", verifyToken, verifyAdmin, createUser);
router.put("/users/:id", verifyToken, verifyAdmin, updateUser);
router.delete("/users/:id", verifyToken, verifyAdmin, deleteUser);

export default router;