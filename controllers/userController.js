//package
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validator from "validator"


import userModel from "../models/userModel.js"
import hashPassword from "../utils/hashPassword.js";



const userController = {
    registerUser: async (req, res) => {
        try {
            const {name, email, password, confirmPassword} = req.body;
            
            // checking is email already exists
            const isEmailExist = await userModel.findOne({email})
            if(isEmailExist){
                return res.status(409).json({success:false, message: "Email already exists!"})
            }
            // validate password and confirm password
            if(password!== confirmPassword){
                return res.status(400).json({success: false, message: "Passwords do not match!"})
            }

            // validating email format & strong password
            if(!validator.isEmail(email)){
                return res.status(400).json({success: false, message: "Please enter a valid email!"})
            }

            if(!validator.isStrongPassword(password, {minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1})){
                return res.status(400).json({success: false, message: "Password should be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character!"})
            }

            // hashing password
            const hashedPassword = hashPassword(password)

            // creating new user
            const newUser = new userModel({name, email, password: hashedPassword})
            const user = await newUser.save()

            // generating jwt token
            const token = jwt.sign({ id: user._id }, process.env.TOKEN_ACCESS_SECRET, { expiresIn: '7d' });

            return res.status(201).json({ success: true, message: "User registered successfully!", token });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    },

    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userModel.findOne({ email});
            if (!user) {
                return res.status(401).json({ success: false, message: "User 'doesn't exist!" });
            }
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(409).json({ success: false, message: "Invalid credentials!" });
            }
            const token = jwt.sign({ id: user._id }, process.env.TOKEN_ACCESS_SECRET, { expiresIn: '7d' });
            res.status(200).json({success:true, token})
        } catch (error) {
            console.error(error);
            return res.status(500).json({ success: false, message: error.message });
        }
    }
};

export default userController;