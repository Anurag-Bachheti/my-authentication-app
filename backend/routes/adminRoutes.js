import express from 'express';
import { verifyToken, verifyAdmin } from '../middleware/authMiddleware.js';
import {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
} from '../controllers/adminController.js';
import { validate } from "../middleware/validate.js";
import {
    adminCreateUserSchema,
    adminUpdateUserSchema
} from '../validations/admin.validation.js';

const router = express.Router();

router.get("/users", verifyToken, verifyAdmin, getAllUsers);
router.post("/users", verifyToken, verifyAdmin, validate(adminCreateUserSchema), createUser);
router.put("/users/:id", verifyToken, verifyAdmin, validate(adminUpdateUserSchema), updateUser);
router.delete("/users/:id", verifyToken, verifyAdmin, deleteUser);

export default router;