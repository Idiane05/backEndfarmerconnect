import userModel from  '../models/userMode.js'
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import validator from 'validator';

// Function to create a token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET); 
};

// Register user
export const register = async (req, res, next) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already registered
        const exist = await userModel.findOne({ email });
        if (exist) {
            return res.status(400).json({ message: 'Email already exists', success: false });
        }

        // Validate email format & string format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: 'Invalid email format', success: false });
        }
        if (password.length < 8) {
            return res.status(400).json({ message: 'Password should be at least 8 characters long', success: false });
        }

        // Hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        });
        const user = await newUser.save();
        
        // Create token
        const token = createToken(user._id);
        res.status(200).json({ message: 'User registered successfully', success: true, token });

    } catch (error) {
        console.log(error.message); 
        res.status(500).json({ message: 'Server error', success: false });
    }
};

// Login user (Placeholder)
export const login = async(req, res, next) => {    
    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        if(user){
            const valid = bcrypt.compareSync(password, user.password);
            if(valid){
                const token = createToken(user._id)
                res.status(200).json({message: 'login successful', token , success:true});
            } else {    
                res.status(400).json({message: 'incorrect password', success:false});
            } 
        } else {
            res.status(400).json({message:'user does not exist', success:false});
        }
    } catch (error) {
        res.status(500).json({message: 'failed to log in', error, success:false});
    }
}

//get all users

export const getAllUsers = async(req, res) => {
    try {
        const users = await userModel.find();
        res.status(200).json({success: true, data: users, message: 'users retrieved successfully'});
    } catch (error) {
        res.status(500).json({message: 'Failed to retrieve users', error, success:false});
    }
}

export const deleteUser = async(req,res)=>{
    const {id} = req.params
    try {
        const user = await userModel.findByIdAndDelete(id);
        if(!user){
            return res.status(404).json({message: 'User not found', success: false});
        }
        res.status(200).json({success: true, message: 'User deleted successfully', data: user});
    } catch (error) {
        res.status(500).json({error: error, message: 'Failed to delete user', success: false});
    }
}


