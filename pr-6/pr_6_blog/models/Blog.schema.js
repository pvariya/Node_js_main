const mongoose = require("mongoose");
const BlogSchema = mongoose.Schema({
  title: String,
  content: String,
  image: String,
  author: String,
  category: String,
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User " }],
  comments: [
    {
      text: String,
      username: String,
      date: { type: Date, default: Date.now },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User " },
    },
  ],
});

let Bolg = mongoose.model("Bolg", BlogSchema);
module.exports = Bolg;
