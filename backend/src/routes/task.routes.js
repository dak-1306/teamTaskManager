const express = require("express");
const protect = require("../middleware/auth.middleware");
const router = express.Router();
const {
  getAllTasks,
  searchTasks,
  createTask,
  getTaskMe,
  getTaskById,
  getTaskByProjectId,
  updateTask,
  deleteTask,
  addAssignees,
  filterTasks,
} = require("../controllers/task.controller");

// GET /tasks - Filter tasks by status, priority, or sort by date
router.get("/", protect, filterTasks);
// POST /tasks - Create a new task
router.post("/create", protect, createTask);
// GET /tasks/search - Search tasks by query
router.get("/search", protect, searchTasks);
// GET /tasks/me - Get tasks for the current user
router.get("/me", protect, getTaskMe);
// GET /tasks/projects/:id - Get a task by project ID
router.get("/projects/:id", protect, getTaskByProjectId);
// GET /tasks/:id - Get a task by ID
router.get("/:id", protect, getTaskById);
// PUT /tasks/:id - Update a task by ID
router.put("/:id", protect, updateTask);
// DELETE /tasks/:id - Delete a task by ID
router.delete("/:id", protect, deleteTask);
// POST /tasks/:id/assignees - Add assignees to a task
router.post("/:id/assignees", protect, addAssignees);
// GET /tasks - Get all tasks
router.get("/", getAllTasks);

module.exports = router;
