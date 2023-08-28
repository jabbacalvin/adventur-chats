const express = require("express");

const checkAuth = require("../../config/checkAuth");
const chatMessageCtrl = require("../../controllers/api/chat");

const router = express.Router();

// GET /api/chat
router.get("/", checkAuth, chatMessageCtrl.getAllChatMessages);

// POST /api/chat
router.post("/", checkAuth, chatMessageCtrl.addChatMessage);

module.exports = router;