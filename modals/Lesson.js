const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const lessonSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  driveUrl: {
    type: String,
    required: true,
  },
  formUrl: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("lessons", lessonSchema);
