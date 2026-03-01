const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  createUser,
  loginUser,
} = require("../controllers/user.controller");

// GET /user - Get all users
router.get("/", getAllUsers);
// POST /user - Create a new user
router.post("/create", createUser);
// POST /user/login - User login
router.post("/login", loginUser);

module.exports = router;
