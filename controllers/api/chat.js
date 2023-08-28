const chatMessage = require('../../models/chatMessage');

async function getAllChatMessages(req, res) {
  const messages = await chatMessage.find();
  res.json(messages)
}

async function addChatMessage(req, res) {
  const message = await chatMessage.create(req.body);
  res.status(201).json(message);
}




module.exports = {
  getAllChatMessages,
  addChatMessage
};