// Version 1
// _id
// conversationId
// projectId?
// taskId?
// senderId
// type
// content
// attachments: []
// mentions: []
// createdAt
// updatedAt

// Version 2
// + reactions
// + editedAt
// + deletedAt

// Version 3
// + replyTo

const mongoose = require("mongoose");

const attachmentSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    filename: { type: String, default: "" },
    mimeType: { type: String, default: "" },
    size: { type: Number, default: 0 },
    thumbnailUrl: { type: String, default: "" },
  },
  { _id: false },
);

const chatSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      enum: ["text", "image", "file", "system"],
      default: "text",
    },
    content: {
      type: String,
      required: function () {
        return this.type === "text";
      },
    },
    attachments: {
      type: [attachmentSchema],
      default: [],
    },
    mentions: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      default: [],
    },
    editedAt: Date,
    deletedAt: Date,
  },
  { timestamps: true },
);

// Indexes to support common queries
chatSchema.index({ conversationId: 1, createdAt: -1 });
chatSchema.index({ project: 1, createdAt: -1 });
chatSchema.index({ task: 1, createdAt: -1 });

const Chat = mongoose.model("Chat", chatSchema);
module.exports = Chat;
