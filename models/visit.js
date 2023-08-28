const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const visitSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    startDate: Date,
    endDate: Date,
    // location: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Location",
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Visit", visitSchema);
