const express = require("express");
const cors = require("cors");
const path = require("path");

const userRoutes = require("./routes/user.routes");
const projectRoutes = require("./routes/project.routes");
const taskRoutes = require("./routes/task.routes");
const conversationRoutes = require("./routes/conversation.routes");
const chatRoutes = require("./routes/chat.routes");

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded files
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

app.use("/users", userRoutes);
app.use("/projects", projectRoutes);
app.use("/tasks", taskRoutes);
app.use("/conversations", conversationRoutes);
app.use("/chats", chatRoutes);

module.exports = app;
