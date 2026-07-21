import User from "../models/User.js";
import bcrypt from 'bcrypt';

const addUser = async (req, res) => {
    try{
        const {name, email, password, phonenumber, role}= req.body;

        const exUser = await User.findOne({ email });
        if(exUser){
            return res.status(400).json({success: false, message: "user already exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        
        const newUser = new User ({
            name,
            email,
            password: hashedPassword,
            phonenumber,
            role,
        });
        await newUser.save();
        return res.status(201).json({success: true, message:"user added succesfully"})
    }catch(error){
        console.error("server error adding user", error.message)
        return res.status(500).json({success: false, message: 'server error in user'});
    }
}

const getUsers = async (req, res) => {
    try{
        const users = await User.find();
        return res.status(201).json({ success: true, message : "users fetched", users})
    }catch(error){
        console.error("users not fetched server eroor", error)
        return res.status(500).json({success: false, message: "server error getting users"})
    }
}

const deleteUser = async (req, res) => {
    try {
        const {id} =  req.params;
        const existingUser = await User.findById(id);
        if(!existingUser) {
            return res.status(404).json({ success: false, message: 'User not found'});
        }
        await User.findByIdAndDelete(id);
            return res.status(200).json({ success: true, message: 'User deleted successfully'});
    }catch (error) {
        console.error('error deleting User', error);
        return res.status(500).json({success: false, message: 'server error'});
    }
}

export {addUser, getUsers, deleteUser}