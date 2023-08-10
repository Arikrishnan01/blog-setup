import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';

export const getAllUsers = async (req, res) => {
    let users;
    try {
         users = await User.find();
    }
    catch (error) {
        console.log(error);
    }

    if(!users) {
         res.status(404).json({
            message: "No users found"
        });
    }
    else {
         res.status(200).json({
            users
        });
    }
};

// SIGNUP NEW USER
export const signup = async(req, res) => {
    const { name, email, password } = req.body;
    let userExists;
    try {
        userExists = await User.findOne({ email });
    }
    catch (error) {
        console.log(`Error: ${error}`);
    }

    // IF THE USER IS ALREADY EXISTS GIVE THE ERROR MESSAGE
    if(userExists) {
        res.status(400).json({
            message: "User already exists"
        });
    }

    const hidePassword = await bcrypt.hashSync(password);
    const newUser = new User({
        name,
        email,
        password: hidePassword,
        blogs: [],
    });

    try {
        await newUser.save();
        res.status(201).json({
            newUser
        });
    }
    catch(error) {
        console.log(`Error: ${error}`);
    }
};

export const login = async (req, res) => {
    const{ email, password } = req.body;
    let userExists;
    try{
        userExists = await User.findOne({ email });
    }
    catch(error) {
        console.log(`Error: ${error}`);
    }

// CHECK THE USER EMAIL ALREADY EXISTS OR NOT
    if(!userExists) {
        res.status(404).json({
            message: "User email does not exist"
        });
    }

// CHECK THE USER PASSWORD ALREADY EXISTS OR NOT
    const passwordMatching = await bcrypt.compareSync(password, userExists.password);

    if(!passwordMatching) {
        res.status(404).json({
            message: "User password does not match"
        });
    }
    else{
        res.status(200).json({
            message: "Login Successfully",
            user: userExists
        });
    }
};