const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema(
  {
    nameOfUser: String,
    message: String,
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model('chatMessage', chatMessageSchema);