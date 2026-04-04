const User = require("../models/user.model");
const Project = require("../models/project.model");
const Task = require("../models/task.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// JWT
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId }, // payload
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES },
  );
};
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

const getUserForAddMemberProject = async (req, res) => {
  try {
    const users = await User.find();
    const userForAddMember = users.filter((user) => user._id.toString() !== req.user.id);
    console.log("Users for add member project:", userForAddMember);
    res.status(200).json(userForAddMember);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve users", error: error.message });
  }
};

// GET /user/me - Get current user profile
const getUserCurrent = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve user", error: error.message });
  }
};

// POST /user - Create a new user
const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log("Creating user with data:", { username, email, password });
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ username, email, password: hashedPassword });
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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    console.log("SECRET:", process.env.JWT_SECRET);
    console.log("EXPIRES:", process.env.JWT_EXPIRES);
    const token = generateToken(user._id);
    console.log("Generated token:", token);
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to login user", error: error.message });
  }
};

// PUT /user/:id - Update user by ID
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const { username, email } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true, runValidators: true },
    ).select("-password");
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update user", error: error.message });
  }
};
// PUT /user/:id/password - Change password by ID
const changePassword = async (req, res) => {
  try {
    const userId = req.params.id;
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Current password is incorrect" });
    }
    const hashedNewPassword = await bcrypt.hash(newPassword, 12);
    user.password = hashedNewPassword;
    await user.save();
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to change password", error: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    const projects = await Project.find({ owner: userId });

    for (const project of projects) {
      const newOwner = project.members.find(
        (member) => member.toString() !== userId,
      );

      if (newOwner) {
        project.owner = newOwner;

        // remove new owner khỏi members
        project.members = project.members.filter(
          (member) => member.toString() !== newOwner.toString(),
        );

        await project.save();
      } else {
        // project chỉ có owner -> delete
        await Project.findByIdAndDelete(project._id);
      }
    }

    // remove user khỏi project members
    await Project.updateMany(
      { members: userId },
      { $pull: { members: userId } },
    );

    // remove user khỏi task assignees
    await Task.updateMany(
      { assignedTo: userId },
      { $pull: { assignedTo: userId } },
    );

    await User.findByIdAndDelete(userId);

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserCurrent,
  createUser,
  loginUser,
  updateUser,
  changePassword,
  deleteUser,
  getUserForAddMemberProject,
};
