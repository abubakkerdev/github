const mongoose = require("mongoose");
const { Schema } = mongoose;

const tokenSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  description: {
    type: String,
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

module.exports = mongoose.model("Token", tokenSchema);
