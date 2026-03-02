const express = require("express");
const router = express.Router();
const {
  getAllProjects,
  createProject,
  getProjectByIdOwner,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/project.controller");

// GET /project - Get all projects
router.get("/", getAllProjects);
// POST /project - Create a new project
router.post("/create", createProject);
// GET /project/:id - Get a project by ID owner
router.get("/owner/:ownerId", getProjectByIdOwner);
// GET /project/:id - Get a project by ID
router.get("/:id", getProjectById);
// PUT /project/:id - Update a project by ID
router.put("/:id", updateProject);
// DELETE /project/:id - Delete a project by ID
router.delete("/:id", deleteProject);

module.exports = router;
