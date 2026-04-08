const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null,
    },

    task: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      default: null,
    },

    name: {
      type: String,
      default: "",
      trim: true,
    },

    type: {
      type: String,
      enum: ["project", "task", "channel", "direct"],
      default: "channel",
    },

    participants: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
      validate: {
        validator: function (val) {
          return val.length > 0;
        },
        message: "Participants must have at least 1 user",
      },
    },

    metadata: {
      type: Object,
      default: {},
    },

    isArchived: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// ================= VALIDATION =================
conversationSchema.pre("validate", function () {
  // Synchronous validation: throw Errors instead of using callback `next`
  if (this.project && this.task) {
    throw new Error("Conversation cannot have both project and task");
  }

  if (this.type === "project" && !this.project) {
    throw new Error("Project is required for project conversation");
  }

  if (this.type === "task" && !this.task) {
    throw new Error("Task is required for task conversation");
  }

  if (
    ["channel", "direct"].includes(this.type) &&
    (this.project || this.task)
  ) {
    throw new Error(
      "Channel/direct conversation must not have project or task",
    );
  }

  if (!this.participants || this.participants.length === 0) {
    throw new Error("Participants are required");
  }

  const uniqueParticipants = new Set(this.participants.map(String));
  if (uniqueParticipants.size !== this.participants.length) {
    throw new Error("Participants must be unique");
  }

  if (this.type === "direct") {
    if (this.participants.length !== 2) {
      throw new Error("Direct conversation must have exactly 2 participants");
    }
    this.participants.sort();
  }
});

// ================= INDEX =================

// query nhanh theo project/task
conversationSchema.index({ project: 1 });
conversationSchema.index({ task: 1 });

// query theo user
conversationSchema.index({ participants: 1 });

// filter
conversationSchema.index({ type: 1 });
conversationSchema.index({ isArchived: 1 });

// ❗ unique direct chat (2 user chỉ có 1 room)
conversationSchema.index(
  { type: 1, participants: 1 },
  {
    unique: true,
    partialFilterExpression: { type: "direct" },
  },
);

const Conversation = mongoose.model("Conversation", conversationSchema);

module.exports = Conversation;
