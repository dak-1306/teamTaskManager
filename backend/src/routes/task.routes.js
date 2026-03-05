const express = require("express");
const protect = require("../middleware/auth.middleware");
const router = express.Router();
const {
  getAllTasks,
  createTask,
  getTaskMe,
  getTaskById,
  getTaskByProjectId,
  updateTask,
  deleteTask,
  addMemberTask,
} = require("../controllers/task.controller");

// GET /tasks - Get all tasks
router.get("/", getAllTasks);
// POST /tasks - Create a new task
router.post("/create", protect, createTask);
// GET /tasks/me - Get tasks for the current user
router.get("/me", protect, getTaskMe);
// GET /tasks/:id - Get a task by ID
router.get("/:id", protect, getTaskById);
// GET /tasks/projects/:id - Get a task by project ID
router.get("/projects/:id", protect, getTaskByProjectId);
// PUT /tasks/:id - Update a task by ID
router.put("/:id", protect, updateTask);
// DELETE /tasks/:id - Delete a task by ID
router.delete("/:id", protect, deleteTask);
// POST /tasks/:id/members - Add a member to a task
router.post("/:id/members", protect, addMemberTask);

module.exports = router;
