const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  thumb: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "disabled"],
  },
});

module.exports = mongoose.model("courses", courseSchema);
