import User from "../models/User.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

// Register a new user(signup)
export const signup = async (req, res) => {
  try {
    // Destructure the request body
    const { name, email, password, role } = req.body;

    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Create a new user
    user = new User({ name, email, password, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } 
  catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// Login a user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if the user exsists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Verify entered password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.json({ token, user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } 
  catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// Fetch all users
export const getUsers = async (req, res) => {
  try {
    //Get all users' name and role
    const users = await User.find({}, "name role"); 
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Error fetching users" });
  }
};