const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chatMessageSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
    message: String,
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model('chatMessage', chatMessageSchema);