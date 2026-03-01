const User = require("../models/user.model");

// Get /user - Get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve users", error: error.message });
  }
};

// POST /user - Create a new user
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Creating user with data:", { username, email, password });
    const newUser = new User({ username, email, password });
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create user", error: error.message });
  }
};

// POST /user/login - User login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt with:", { email, password });
    const user = await User.findOne({ email, password });
    console.log("Login result:", user);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    res.status(200).json({ message: "Login successful", token: "dummy-token" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to login user", error: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  loginUser,
};
