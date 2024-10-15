const mongoose = require("mongoose");
const dbConnect = async () => {
  await mongoose.connect("mongodb://localhost:27017/pr-6");
  console.log("Connect to Mongo Server");
};

module.exports = dbConnect;
