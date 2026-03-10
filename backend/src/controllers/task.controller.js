const Task = require("../models/task.model");
const Project = require("../models/project.model");
const User = require("../models/user.model");

// GET /tasks - Get all tasks
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("project", "name")
      .populate("assignedTo", "username email");
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve tasks", error: error.message });
  }
};

// POST /tasks/create - Create a new task
const createTask = async (req, res) => {
  try {
    const {
      title,
      description,
      dueDate,
      priority,
      status,
      projectId,
      emailAssignTo,
    } = req.body;
    console.log("Received task creation request with data:", req.body);
    const project = await Project.findById(projectId);
    console.log("Fetched project for task creation:", project);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    if (project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to create task" });
    }
    let userToAssign = null;
    if (emailAssignTo) {
      userToAssign = await User.findOne({ email: emailAssignTo });
      console.log("Fetched user to assign for task creation:", userToAssign);
      if (!userToAssign) {
        return res.status(404).json({ message: "User to assign not found" });
      }
    }

    const newTask = new Task({
      title: title || "Untitled Task",
      description: description || "",
      dueDate: dueDate || null,
      priority: priority || "medium",
      status: status || "todo",
      project: projectId,
      assignedTo: emailAssignTo ? [userToAssign._id] : [],
    });
    console.log("Created new task object:", newTask);
    const savedTask = await newTask.save();
    await savedTask.populate("assignedTo", "username email");
    console.log("Populated task with assigned user details:", savedTask);
    res.status(201).json(savedTask);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to create task", error: error.message });
  }
};

// GET /tasks/me - Get tasks for the current user
const getTaskMe = async (req, res) => {
  try {
    const tasks = await Task.find({
      assignedTo: req.user.id,
    })
      .populate("project", "name")
      .populate("assignedTo", "username email");
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve tasks", error: error.message });
  }
};

// GET /tasks/:id - Get a task by ID
const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id)
      .populate("project", "name owner")
      .populate("assignedTo", "username email");
    console.log("Received request to get task by ID:", id);
    console.log("Fetched task by ID:", task);
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve task", error: error.message });
  }
};

// GET /tasks/projects/:id - Get a task by project ID
const getTaskByProjectId = async (req, res) => {
  try {
    const { id } = req.params;
    // Tìm project
    const project = await Project.findById(id);
    console.log("Fetched project for getTaskByProjectId:", project);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }
    // Kiểm tra quyền
    const isOwner = project.owner.toString() === req.user.id;

    const isMember = project.members.some(
      (memberId) => memberId.toString() === req.user.id,
    );

    if (!isOwner && !isMember) {
      return res.status(403).json({ message: "Forbidden" });
    }
    const tasks = await Task.find({ project: id })
      .populate("project", "name owner ")
      .populate("assignedTo", "username email");
    console.log("Received request to get task by project ID:", id);
    console.log("Fetched task by project ID:", tasks);
    if (!tasks || tasks.length === 0) {
      return res.status(404).json({ message: "Tasks not found" });
    }

    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to retrieve task", error: error.message });
  }
};

// PUT /tasks/:id - Update a task by ID
const updateTask = async (req, res) => {
  try {
    console.log("Received request to update task with ID:", req.params.id);
    console.log("Request body for updating task:", req.body);
    const { id } = req.params;
    const { title, description, dueDate, priority, status, assignedTo } =
      req.body;
    const task = await Task.findById(id).populate("project");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to update task" });
    }
    let assignedUserIds = task.assignedTo;

    if (assignedTo) {
      const users = await User.find({
        email: { $in: assignedTo },
      });

      assignedUserIds = users.map((user) => user._id);
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.assignedTo = assignedUserIds;
    const updatedTask = await task.save();
    await updatedTask.populate("assignedTo", "username email");
    res.status(200).json(updatedTask);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update task", error: error.message });
  }
};

// DELETE /tasks/:id - Delete a task by ID
const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id).populate("project");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.project.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to delete task" });
    }
    await Task.findByIdAndDelete(id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete task", error: error.message });
  }
};

// POST /tasks/:id/assignees - Add assignees to a task
const addAssignees = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.body;
    const task = await Task.findById(id).populate("project");
    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }
    if (task.project.owner.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Unauthorized to add assignees to task" });
    }
    const userToAssign = await User.findOne({ email });
    if (!userToAssign) {
      return res.status(404).json({ message: "User to assign not found" });
    }
    if (task.assignedTo.includes(userToAssign._id)) {
      return res.status(400).json({ message: "User already assigned to task" });
    }
    task.assignedTo.push(userToAssign._id);
    await task.save();
    await task.populate("assignedTo", "username email");
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({
      message: "Failed to add assignees to task",
      error: error.message,
    });
  }
};

// GET /tasks/search - Search tasks by query
const searchTasks = async (req, res) => {
  try {
    const { query, projectId } = req.query;
    console.log("Search query:", query, "Project ID:", projectId);
    const tasks = await Task.find({
      title: { $regex: query, $options: "i" },
      project: projectId,
    })
      .populate("project", "name")
      .populate("assignedTo", "username email");
    console.log("Search results for tasks:", tasks);
    res.status(200).json(tasks);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to search tasks", error: error.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  getTaskMe,
  getTaskById,
  getTaskByProjectId,
  updateTask,
  deleteTask,
  addAssignees,
  searchTasks,
};
