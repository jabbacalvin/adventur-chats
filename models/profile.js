const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const profileSchema = new Schema(
  {
    username: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    profilePics: [
      {
        type: Schema.Types.ObjectId,
        ref: "Image",
      },
    ],
    homeBase: {
      type: Schema.Types.ObjectId,
      ref: "Location",
    },
    visits: [
      {
        type: Schema.Types.ObjectId,
        ref: "Visit",
      },
    ],
    useUsername: { type: Boolean, default: true },
    useAvatar: { type: Boolean, default: true },
    isMessageable: { type: Boolean, default: true },
    isSearchable: { type: Boolean, default: true },
    bio: String,
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
    followers: [
      {
        type: Schema.Types.ObjectId,
        ref: "Profile",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Profile", profileSchema);
