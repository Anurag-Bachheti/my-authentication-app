import express from 'express';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

//REGISTER
router.post('/register', async(req,res)=> {
    try{
        const {name, email, password} = req.body;

        // check if user exists
        const existingUser = await User.findOne({email});
        if(existingUser) return res.status(400).json({ message: "User already exists" });

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await brcypt.hash(password, salt);

        // Create User
        const newUser = new User({name, email, password: {hashedPassword}});
        await newUser.save();

        res.status(201).json({message: "User created successfully"});
    }catch(err){
        res.status(500).json({message: err.message})
    }
});

// LOGIN
router.post('/login', async(req,res)=> {
    try{
        const { email, password } = req.body;

        // check if user exists
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({ message: "Invalid Credentials" });

        // compare password
        const ifMatch = await bcrypt.compare(password, user.password);
        if(!ifMatch) return res.status(400).json({ message: "Invalid Credentials" });

        // create JWT
        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: '1hr'});

        res.json({token, user: {id: user_id, name: user.name, email: user.email} })
    }catch(err){
        res.status(500).json({message: err.message})
    }
})

export default router;