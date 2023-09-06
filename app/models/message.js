const mongoose = require("mongoose");
const { Schema } = mongoose;

const messageSchema = new Schema({
  teacherId: {
    type: String,
    required: true,
  },
  studentId: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  messageType: {
    type: String,
    default: "text",
    enum: ["text", "images", "video", "audio"],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Message", messageSchema);
