const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth.middleware");
const controller = require("../controllers/conversation.controller");

// Public: list conversations (supports query params)
router.get("/", protect, controller.list);
router.get("/:id", protect, controller.get);

// Create conversation
router.post("/", protect, controller.create);

// Update and Delete
router.put("/:id", protect, controller.update);
router.delete("/:id", protect, controller.delete);

// Participants
router.post("/:id/participants", protect, controller.addParticipant);
router.delete("/:id/participants", protect, controller.removeParticipant);
// allow deleting by URL param or by sending { userId } in body
router.delete(
  "/:id/participants/:userId",
  protect,
  controller.removeParticipant,
);

module.exports = router;
