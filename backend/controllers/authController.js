import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const login = async (req, res) => {
    try {
        const { email,password } = req.body;

        const user = await User.findOne({ email});
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({message: "Invalid credentials"});
        }
        const token = jwt.sign({id: user._id, role: user.role}, process.env.JWT_SECRET, {expiresIn: '1h'});
        
        return res.status(200).json({success:true, message: "Login sucessful", token, user: {isAdmin: user.role === 'admin', name: user.name, email: user.email}});
    } catch (error) {
        return res.status (500).json({success: false, message: "Internal server error", error: error.message});
    }
}

export {login};