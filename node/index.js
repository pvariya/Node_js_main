require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const dbConnetc = require("./config/db");
const userRouter = require("./routes/user_route");
const cors = require("cors");
const PORT = process.env.PORT || 8090;
const cookie = require("cookie-parser");

app.use(cookie());
app.use(cors());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use("/uploade", express.static(path.join(__dirname, "uploade")));

app.get("/", (req, res) => {
  res.send("Welcome to the node");
});

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  dbConnetc();
});
