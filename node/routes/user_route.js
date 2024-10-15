const { Router } = require("express");
const {
  getUser,
  postUser,
  updateUser,
  deleteUser,
  upload,
  loginUser,
  sendOtp,
  resetPass,
} = require("../controllers/user_controller");
const isAuth = require("../middleware/isAuth");
const sendMail = require("../service/mailService");

const userRouter = Router();

userRouter.get("/getUser", getUser);
userRouter.post("/postUser", upload.array("img"), postUser);
userRouter.post("/login", loginUser);
userRouter.patch("/:id", updateUser);
userRouter.delete("/:id", deleteUser);
userRouter.post("/upload", upload.single("img"), (req, res) => {
  console.log(req.file);
  res.send("file uploaded");
});
userRouter.post("/otp", sendOtp);
userRouter.post("/resetPass", resetPass);

// file
userRouter.get("/index", isAuth, (req, res) => {
  res.render("index");
});

userRouter.get("/login", (req, res) => {
  res.render("login");
});

userRouter.get("/singup", (req, res) => {
  res.render("singup");
});

userRouter.get("/reset", (req, res) => {
  res.render("resetPass");
});

// mail
userRouter.post("/mail", (req, res) => {
  const { to, subject, html } = req.body;
  sendMail(to, subject, html);
  res.send("sending mail");
});

module.exports = userRouter;
