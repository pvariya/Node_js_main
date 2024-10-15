const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  role: {
    type: String,
    default: "user",
  },
});

let User = mongoose.model("User", userSchema);
module.exports = User;
