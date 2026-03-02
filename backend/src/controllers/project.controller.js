const Project = require("../models/project.model");

// GET /project - Get all projects
const getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("owner", "username email");
    res.status(200).json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve projects", error: error.message });
  }
};

// POST /project/create - Create a new project
const createProject = async (req, res) => {
  try {
    const { name, description } = req.body;
    const newProject = new Project({ name, description });
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create project", error: error.message });
  }
};

// GET /project/owner/:ownerId - Get projects by owner ID
const getProjectByIdOwner = async (req, res) => {
  try {
    const { ownerId } = req.params;
    const projects = await Project.find({ owner: ownerId }).populate(
      "owner",
      "username email",
    );
    res.status(200).json(projects);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve projects", error: error.message });
  }
};

// GET /project/:id - Get a project by ID
const getProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.findById(id).populate(
      "owner",
      "username email",
    );
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve project", error: error.message });
  }
};

// PUT /project/:id - Update a project by ID
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description } = req.body;
    console.log(
      "Updating project with ID:",
      id,
      "Name:",
      name,
      "Description:",
      description,
    );
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { name, description },
      { new: true },
    ).populate("owner", "username email");
    if (!updatedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(updatedProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update project", error: error.message });
  }
};

// DELETE /project/:id - Delete a project by ID
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject) {
      return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete project", error: error.message });
  }
};

module.exports = {
  getAllProjects,
  createProject,
  getProjectByIdOwner,
  getProjectById,
  updateProject,
  deleteProject,
};
