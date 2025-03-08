const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  userName: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  }
});

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
