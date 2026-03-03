const express = require("express");
const protect = require("../middleware/auth.middleware");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  loginUser,
  getUserCurrent,
} = require("../controllers/user.controller");

// GET /user - Get all users
router.get("/", getAllUsers);
// GET /user/me
router.get("/me", protect, getUserCurrent);
// POST /user - Create a new user
router.post("/create", createUser);
// POST /user/login - User login
router.post("/login", loginUser);

module.exports = router;
