const { Router } = require("express");
const { signUp, getUser, login, deleteById } = require("../controllers/userController.js");
const userRouter = Router();

userRouter.post("/signup", signUp);
userRouter.get("/getUser", getUser);
userRouter.post("/login", login);
userRouter.delete("/deleteUser/:id",deleteById)

userRouter.get("/singUp", (req, res) => {
  res.render("signUp");
});
userRouter.get("/logIn", (req, res) => {
  res.render("logIn");
});

userRouter.get("/index",(req, res) => {
    res.render("index");
})
module.exports = userRouter;
