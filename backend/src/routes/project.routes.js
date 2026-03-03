const express = require("express");
const protect = require("../middleware/auth.middleware");
const router = express.Router();
const {
  getAllProjects,
  createProject,
  getProjectMe,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");

// GET /project - Get all projects
router.get("/", getAllProjects);
// POST /project - Create a new project
router.post("/create", protect, createProject);
// GET /project/me - Get projects for the current user
router.get("/me", protect, getProjectMe);
// GET /project/:id - Get a project by ID
router.get("/:id", protect, getProjectById);
// PUT /project/:id - Update a project by ID
router.put("/:id", protect, updateProject);
// DELETE /project/:id - Delete a project by ID
router.delete("/:id", protect, deleteProject);

module.exports = router;
