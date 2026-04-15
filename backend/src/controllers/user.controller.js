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
    const userForAddMember = users.filter(
      (user) => user._id.toString() !== req.user.id,
    );
    
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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const token = generateToken(user._id);
    
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

// POST /user/:id/avatar - upload avatar image
const uploadAvatar = async (req, res) => {
  try {
    const userId = req.params.id;

    // only allow user to update their own avatar
    if (!req.user || req.user.id.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // delete previous avatar file if exists
    try {
      const prevAvatar = (await User.findById(userId).select("avatar")).avatar;
      if (prevAvatar) {
        const uploadPrefix = `${req.protocol}://${req.get("host")}/uploads/`;
        if (prevAvatar.startsWith(uploadPrefix)) {
          const prevFilename = prevAvatar.replace(uploadPrefix, "");
          const prevPath = require("path").join(
            __dirname,
            "..",
            "..",
            "uploads",
            prevFilename,
          );
          if (require("fs").existsSync(prevPath)) {
            try {
              require("fs").unlinkSync(prevPath);
            } catch (e) {
              console.warn("Failed to delete previous avatar file:", e.message);
            }
          }
        }
      }
    } catch (err) {
      console.warn(
        "Error while attempting to remove previous avatar:",
        err.message,
      );
    }

    const fileUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatar: fileUrl },
      { new: true },
    ).select("-password");

    return res
      .status(200)
      .json({ message: "Avatar uploaded", user: updatedUser });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// DELETE /user/:id/avatar - remove avatar and delete file
const deleteAvatar = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!req.user || req.user.id.toString() !== userId.toString()) {
      return res.status(403).json({ message: "Forbidden" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user || !user.avatar) {
      return res.status(404).json({ message: "No avatar to delete" });
    }

    const uploadPrefix = `${req.protocol}://${req.get("host")}/uploads/`;
    if (user.avatar.startsWith(uploadPrefix)) {
      const filename = user.avatar.replace(uploadPrefix, "");
      const filepath = require("path").join(
        __dirname,
        "..",
        "..",
        "uploads",
        filename,
      );
      if (require("fs").existsSync(filepath)) {
        try {
          require("fs").unlinkSync(filepath);
        } catch (e) {
          console.warn("Failed to delete avatar file:", e.message);
        }
      }
    }

    user.avatar = "";
    await user.save();

    return res.status(200).json({ message: "Avatar deleted", user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
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
  uploadAvatar,
  deleteAvatar,
};
