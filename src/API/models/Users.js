const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    UserId: Number,
    name: String,
    email: String,
    username: String,
    passwords: String,
  },
  { collection: "Users" }
);


const Users = mongoose.model("User", userSchema);

module.exports = Users;
