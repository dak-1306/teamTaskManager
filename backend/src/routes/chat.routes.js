const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");
const controller = require("../controllers/chat.controller");

// List messages in a conversation
router.get(
  "/conversation/:conversationId",
  protect,
  controller.listByConversation,
);

// Send a message to a conversation
router.post(
  "/conversation/:conversationId",
  protect,
  upload.array("attachments", 5),
  controller.create,
);

// Edit a message
router.put("/message/:id", protect, controller.update);

// Delete (soft) a message
router.delete("/message/:id", protect, controller.delete);

module.exports = router;
