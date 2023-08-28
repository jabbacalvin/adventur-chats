const chatMessage = require('../../models/chatMessage');

async function getAllChatMessages(req, res) {
  const messages = await chatMessage
    .find()
    .populate({
      path: "user",
      populate: { path: "profilePics", model: "Image" },
    });
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