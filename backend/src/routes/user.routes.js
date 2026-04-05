const express = require("express");
const protect = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const router = express.Router();
const {
  getAllUsers,
  getUserForAddMemberProject,
  createUser,
  loginUser,
  getUserCurrent,
  updateUser,
  changePassword,
  deleteUser,
  uploadAvatar,
  deleteAvatar,
} = require("../controllers/user.controller");

// GET /user - Get all users
router.get("/", protect, getAllUsers);
// GET /user/add-member - Get users for add member project
router.get("/add-member", protect, getUserForAddMemberProject);
// GET /user/me
router.get("/me", protect, getUserCurrent);
// POST /user - Create a new user
router.post("/create", createUser);
// POST /user/login - User login
router.post("/login", loginUser);
// PUT /user/:id - Update user by ID
router.put("/:id", protect, updateUser);
// PUT /user/:id/password - Change password by ID
router.put("/:id/password", protect, changePassword);
// DELETE /user/:id - Delete user by ID
router.delete("/:id", protect, deleteUser);

// POST /user/:id/avatar - upload avatar image (form field name: "avatar")
router.post("/:id/avatar", protect, upload.single("avatar"), uploadAvatar);
// DELETE /users/:id/avatar - delete avatar
router.delete("/:id/avatar", protect, deleteAvatar);

module.exports = router;
