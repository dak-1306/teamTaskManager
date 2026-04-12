const Chat = require("../models/chat.model");
const Conversation = require("../models/conversation.model");

// List chats for a conversation (pagination via limit, before, after)
exports.listByConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { limit = 50, before, after } = req.query;

    const conv = await Conversation.findById(conversationId);
    if (!conv)
      return res.status(404).json({ message: "Conversation not found" });

    // ensure requester is participant
    if (!conv.participants.map(String).includes(String(req.user.id))) {
      return res.status(403).json({ message: "Not a participant" });
    }

    const filter = { conversationId };
    if (before || after) filter.createdAt = {};
    if (before) filter.createdAt.$lt = new Date(before);
    if (after) filter.createdAt.$gt = new Date(after);

    const docs = await Chat.find(filter)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit, 10))
      .populate("sender", "username avatar");
    // return ascending order (oldest first)
    res.json(docs.reverse());
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to list chats", error: err.message });
  }
};

// Create/send a chat message in a conversation
exports.create = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const {
      type = "text",
      content,
      attachments = [],
      mentions = [],
    } = req.body;

    const conv = await Conversation.findById(conversationId);
    if (!conv)
      return res.status(404).json({ message: "Conversation not found" });

    if (!conv.participants.map(String).includes(String(req.user.id))) {
      return res.status(403).json({ message: "Not a participant" });
    }

    if (type === "text" && (!content || String(content).trim() === "")) {
      return res
        .status(400)
        .json({ message: "Content is required for text messages" });
    }

    const chat = new Chat({
      conversationId,
      project: conv.project || undefined,
      task: conv.task || undefined,
      sender: req.user.id,
      type,
      content,
      attachments,
      mentions,
    });

    await chat.save();
    await chat.populate("sender", "username avatar");
    res.status(201).json(chat);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create chat", error: err.message });
  }
};

// Update/edit a chat (only sender can edit)
exports.update = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    if (String(chat.sender) !== String(req.user.id)) {
      return res
        .status(403)
        .json({ message: "Not allowed to edit this message" });
    }

    const { content, attachments } = req.body;
    if (content !== undefined) chat.content = content;
    if (attachments !== undefined) chat.attachments = attachments;
    chat.editedAt = new Date();

    await chat.save();
    res.json(chat);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update chat", error: err.message });
  }
};

// Delete a chat (soft delete) – only sender can delete
exports.delete = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(404).json({ message: "Chat not found" });

    if (String(chat.sender) !== String(req.user.id)) {
      return res
        .status(403)
        .json({ message: "Not allowed to delete this message" });
    }

    chat.deletedAt = new Date();
    await chat.save();
    res.json({ message: "Message deleted", id: chat._id });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete chat", error: err.message });
  }
};
