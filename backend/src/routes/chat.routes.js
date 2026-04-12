const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.middleware");
const controller = require("../controllers/chat.controller");

// List messages in a conversation
router.get(
  "/conversation/:conversationId",
  protect,
  controller.listByConversation,
);

// Send a message to a conversation
router.post("/conversation/:conversationId", protect, controller.create);

// Edit a message
router.put("/:id", protect, controller.update);

// Delete (soft) a message
router.delete("/:id", protect, controller.delete);

module.exports = router;
