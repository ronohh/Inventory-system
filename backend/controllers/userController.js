import User from "../models/User.js";

const addUser = async (req, res) => {
    try{
        const {name, email, password, phonenumber, role}= req.body;
        const newUser = new User ({
            name,
            email,
            password,
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

export {addUser, getUsers}