#!/usr/bin/env node
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");

// reuse project's DB connection helper
const connectDB = require("../src/config/db");

const User = require("../src/models/user.model");
const Project = require("../src/models/project.model");
const Task = require("../src/models/task.model");

dotenv.config();
async function seed() {
  try {
    await connectDB();

    // clear existing data
    await Promise.all([
      User.deleteMany({}),
      Project.deleteMany({}),
      Task.deleteMany({}),
    ]);

    const plain = "password123";
    const hash = await bcrypt.hash(plain, 10);

    const users = await User.insertMany([
      { username: "user1", email: "user1@example.com", password: hash },
      { username: "user2", email: "user2@example.com", password: hash },
      { username: "user3", email: "user3@example.com", password: hash },
      { username: "user4", email: "user4@example.com", password: hash },
      { username: "user5", email: "user5@example.com", password: hash },
    ]);

    const projects = await Project.insertMany([
      {
        name: "Website Redesign",
        description: "Cập nhật giao diện và UX",
        owner: users[0]._id,
        members: [users[1]._id, users[2]._id],
      },
      {
        name: "Mobile App",
        description: "Ứng dụng iOS/Android",
        owner: users[1]._id,
        members: [users[2]._id, users[3]._id],
      },
      {
        name: "Marketing Campaign",
        description: "Chiến dịch Q3",
        owner: users[2]._id,
        members: [users[3]._id, users[4]._id],
      },
    ]);

    const tasks = [
      {
        title: "Thiết kế landing",
        description: "Thiết kế lại trang chủ",
        dueDate: new Date("2026-05-10"),
        status: "todo",
        priority: "high",
        project: projects[0]._id,
        assignedTo: [users[1]._id],
      },
      {
        title: "Xây layout responsive",
        description: "Responsive cho mobile",
        dueDate: new Date("2026-05-18"),
        status: "doing",
        priority: "medium",
        project: projects[0]._id,
        assignedTo: [users[2]._id],
      },
      {
        title: "API authentication",
        description: "Token + refresh",
        dueDate: new Date("2026-04-30"),
        status: "doing",
        priority: "high",
        project: projects[1]._id,
        assignedTo: [users[0]._id],
      },
      {
        title: "Test e2e",
        description: "Viết test chính",
        dueDate: new Date("2026-05-22"),
        status: "todo",
        priority: "low",
        project: projects[1]._id,
        assignedTo: [users[2]._id, users[3]._id],
      },
      {
        title: "Landing A/B",
        description: "A/B testing nội dung",
        dueDate: new Date("2026-06-01"),
        status: "todo",
        priority: "medium",
        project: projects[0]._id,
        assignedTo: [],
      },
      {
        title: "Tạo assets cho campaign",
        description: "Banner và video ngắn",
        dueDate: new Date("2026-05-05"),
        status: "doing",
        priority: "high",
        project: projects[2]._id,
        assignedTo: [users[3]._id],
      },
      {
        title: "Fix bug đăng nhập",
        description: "Lỗi khi đăng nhập bằng social",
        dueDate: new Date("2026-04-12"),
        status: "done",
        priority: "high",
        project: projects[1]._id,
        assignedTo: [users[0]._id],
      },
      {
        title: "Thiết lập CI",
        description: "Pipeline build & test",
        dueDate: new Date("2026-04-20"),
        status: "todo",
        priority: "medium",
        project: projects[0]._id,
        assignedTo: [users[1]._id],
      },
      {
        title: "Phân tích KPIs",
        description: "Xác định KPI chiến dịch",
        dueDate: new Date("2026-05-28"),
        status: "todo",
        priority: "low",
        project: projects[2]._id,
        assignedTo: [users[4]._id],
      },
    ];

    await Task.insertMany(tasks);

    console.log("Seed completed successfully");
  } catch (err) {
    console.error("Seed failed:", err);
  } finally {
    // ensure mongoose disconnect
    try {
      await mongoose.disconnect();
    } catch (e) {}
    process.exit(0);
  }
}

if (require.main === module) seed();
