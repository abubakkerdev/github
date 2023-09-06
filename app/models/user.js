const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  uname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  batchName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "student",
    enum: ["student", "admin", "teacher"],
  },
  department: {
    type: Schema.Types.ObjectId,
    ref: "Department",
  },
  course: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
