const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  profilePic: {
    type: String,
    default: '',
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
}, {
  timestamps: true,
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
