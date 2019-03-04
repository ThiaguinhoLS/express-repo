const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MessagesSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "Users",
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Messages", MessagesSchema);
