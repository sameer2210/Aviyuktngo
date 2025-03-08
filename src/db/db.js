const mongoose = require("mongoose");

function connectDB() {
  mongoose.connect("mongodb://127.0.0.1:27017/try-db")
    .then(() => {
      console.log(`mongodb is connected to db`);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

module.exports = connectDB;
