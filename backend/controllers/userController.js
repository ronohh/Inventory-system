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

export {addUser}