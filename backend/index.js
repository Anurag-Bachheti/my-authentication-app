import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import {connectDB} from './db.js'
import passport from "passport";
import "./config/passport.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(passport.initialize());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// test route
app.get('/', (req,res)=> {
    res.send("Backend is running...")
})

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
});