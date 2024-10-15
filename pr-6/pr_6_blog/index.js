require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const dbConnect = require("./config/db");
const userRouter = require("./routes/user.route.js");
const cookie = require("cookie-parser");
const blogRoute = require("./routes/blog.route.js");
const auth = require("./middleware/auth.js");

// Middleware
app.use(cookie());
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploade", express.static(path.join(__dirname, "uploade")));

app.use("/user",userRouter);
app.use("/blog",auth, blogRoute);

app.listen(8090, () => {
  console.log(`Server running on port 8090`);
  dbConnect();
});
