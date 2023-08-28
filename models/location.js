const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const locationSchema = new Schema({
  googlePlaceId: String,
  placeName: String,
});

module.exports = mongoose.model("Location", locationSchema);
