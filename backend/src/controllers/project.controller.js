const Project = require("../models/project.model");
const User = require("../models/user.model");

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
    const newProject = new Project({ name, description, owner: req.user.id });
    console.log("Creating project with data:", {
      name,
      description,
      owner: req.user.id,
    });
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create project", error: error.message });
  }
};

// GET /project/me
const getProjectMe = async (req, res) => {
  try {
    const projects = await Project.find({ owner: req.user.id }).populate(
      "owner",
      "username email",
    );
    console.log("Projects for user:", req.user.id, "Owned projects:", projects);
    const memberProjects = await Project.find({
      members: req.user.id,
    }).populate("owner", "username email");
    console.log("Member projects:", memberProjects);
    res.status(200).json({ projects, memberProjects });
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
    const project = await Project.findById(id)
      .populate("owner", "username email")
      .populate("members", "username email");
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
    const { name, description, members } = req.body;
    console.log(
      "Updating project with ID:",
      id,
      "Name:",
      name,
      "Description:",
      description,
      "Members:",
      members,
    );
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { name, description, members },
      { returnDocument: "after" },
    )
      .populate("owner", "username email")
      .populate("members", "username email");
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

// POST /project/:id/members - Add a member to a project
const addMemberProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { memberEmail } = req.body;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Kiểm tra quyền
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Tìm user theo email
    const user = await User.findOne({ email: memberEmail });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Thêm member nếu chưa tồn tại
    const updatedProject = await Project.findByIdAndUpdate(
      id,
      { $addToSet: { members: user._id } },
      { returnDocument: "after" },
    )
      .populate("owner", "username email")
      .populate("members", "username email");

    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET /project/search - Search projects by name
const searchProjects = async (req, res) => {
  try {
    const { query } = req.query;
    const userId = req.user.id;

    // Tìm kiếm trong cả project owned và member
    const ownedProjects = await Project.find({
      owner: userId,
      name: { $regex: query, $options: "i" },
    }).populate("owner", "username email");
    const memberProjects = await Project.find({
      members: userId,
      name: { $regex: query, $options: "i" },
    }).populate("owner", "username email");

    res.status(200).json({ ownedProjects, memberProjects });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to search projects", error: error.message });
  }
};

// GET /project - Filter projects by name, status, or date
const filterProjects = async (req, res) => {
  try {
    const { name, date } = req.query;
    const userId = req.user.id;
    console.log("Filtering projects for user:", userId, name, date);
    let sortOptions = {};
    if (name) {
      sortOptions.name = name === "nameAsc" ? 1 : -1;
    }
    if (date) {
      sortOptions.createdAt = date === "createdAtAsc" ? 1 : -1;
    }
    // Tìm kiếm trong cả project owned và member
    const ownerProject = await Project.find({
      owner: userId,
    })
      .populate("owner", "username email")
      .sort(sortOptions);
    const memberProject = await Project.find({
      members: userId,
    })
      .populate("owner", "username email")
      .sort(sortOptions);
    console.log("Filtered owned projects:", ownerProject);
    console.log("Filtered member projects:", memberProject);
    res
      .status(200)
      .json({ ownedProjects: ownerProject, memberProjects: memberProject });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to filter projects", error: error.message });
  }
};

module.exports = {
  getAllProjects,
  createProject,
  getProjectMe,
  getProjectById,
  updateProject,
  deleteProject,
  addMemberProject,
  searchProjects,
  filterProjects,
};
