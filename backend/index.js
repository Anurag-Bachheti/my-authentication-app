import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import {connectDB} from './db.js'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', authRoutes);

// test route
app.get('/', (req,res)=> {
    res.send("Backend is running...")
})

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
});