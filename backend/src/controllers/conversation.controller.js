const Conversation = require("../models/conversation.model");
const Project = require("../models/project.model");
const Task = require("../models/task.model");

// List conversations, optionally filtered by project or participant
exports.list = async (req, res) => {
  try {
    const { project, participant } = req.query;
    const filter = {};
    if (project) filter.project = project;
    if (participant) filter.participants = participant;

    const conversations = await Conversation.find(filter).sort({
      updatedAt: -1,
    });
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ message: "Failed to list conversations" });
  }
};

// Get one conversation
exports.get = async (req, res) => {
  try {
    const conv = await Conversation.findById(req.params.id);
    if (!conv)
      return res.status(404).json({ message: "Conversation not found" });
    res.json(conv);
  } catch (err) {
    res.status(500).json({ message: "Failed to get conversation" });
  }
};

// Helper: check create permission
async function canCreateConversation(userId, { projectId, taskId }) {
  if (projectId) {
    const project = await Project.findById(projectId);
    if (!project) return false;
    return String(project.owner) === String(userId);
  }

  if (taskId) {
    const task = await Task.findById(taskId);
    if (!task) return false;
    // if task has createdBy, prefer that; otherwise allow assignedTo members
    if (task.createdBy) return String(task.createdBy) === String(userId);
    if (Array.isArray(task.assignedTo)) {
      return task.assignedTo.map(String).includes(String(userId));
    }
    return false;
  }

  // if neither project nor task specified, deny by default
  return false;
}

// Create a conversation
exports.create = async (req, res) => {
  try {
    const {
      project,
      task,
      name,
      type,
      participants = [],
      metadata = {},
    } = req.body;
    console.log("payload in create conversation", req.body);
    const allowed = await canCreateConversation(req.user.id, {
      projectId: project,
      taskId: task,
    });
    if (!allowed)
      return res
        .status(403)
        .json({ message: "Not allowed to create conversation" });

    // ensure creator is included in participants
    let participantsArr = Array.isArray(participants)
      ? participants.slice()
      : [];
    if (!participantsArr.map(String).includes(String(req.user.id))) {
      participantsArr.push(req.user.id);
    }

    const conv = new Conversation({
      project,
      task,
      name,
      type,
      participants: participantsArr,
      metadata,
    });
    console.log("conv in create conversation", conv);
    await conv.save();
    res.status(201).json(conv);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create conversation", error: err.message });
  }
};

// Update conversation (name, metadata, isArchived)
exports.update = async (req, res) => {
  try {
    const conv = await Conversation.findById(req.params.id);
    if (!conv)
      return res.status(404).json({ message: "Conversation not found" });

    const { name, metadata, isArchived } = req.body;
    if (name !== undefined) conv.name = name;
    if (metadata !== undefined) conv.metadata = metadata;
    if (isArchived !== undefined) conv.isArchived = isArchived;

    await conv.save();
    res.json(conv);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update conversation", error: err.message });
  }
};

// Add participant
exports.addParticipant = async (req, res) => {
  try {
    const conv = await Conversation.findById(req.params.id);
    if (!conv)
      return res.status(404).json({ message: "Conversation not found" });

    const { userId } = req.body;
    if (!userId) return res.status(400).json({ message: "userId required" });

    if (!conv.participants.map(String).includes(String(userId))) {
      conv.participants.push(userId);
      await conv.save();
    }
    res.json(conv);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add participant", error: err.message });
  }
};

// Remove participant
exports.removeParticipant = async (req, res) => {
  try {
    const conv = await Conversation.findById(req.params.id);
    if (!conv)
      return res.status(404).json({ message: "Conversation not found" });
    // accept userId either from URL param or request body
    const userId = req.params.userId || req.body.userId;
    if (!userId) return res.status(400).json({ message: "userId required" });

    conv.participants = conv.participants.filter(
      (p) => String(p) !== String(userId),
    );
    await conv.save();
    res.json(conv);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to remove participant", error: err.message });
  }
};

// Delete conversation
exports.delete = async (req, res) => {
  try {
    const conv = await Conversation.findById(req.params.id);
    if (!conv) {
      return res.status(404).json({ message: "Conversation not found" });
    }

    // Thực hiện xóa phòng
    await Conversation.findByIdAndDelete(req.params.id);
    res.json({ message: "Conversation deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete conversation", error: err.message });
  }
};
