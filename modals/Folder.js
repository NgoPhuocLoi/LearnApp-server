const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const folderSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  createAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("folders", folderSchema);
