const multer = require("multer");
const User = require("../models/user_Schema");
// const coockie = require("cookie-parser")
const getUser = async (req, res) => {
  data = await User.find();
  res.send(data);
};

const postUser = async (req, res) => {
  console.log(req.body);
  console.log(req.files);

  let { username, password, email } = req.body;
  let profileImg;
  if (req.files) {
    profileImg = req.files.map((ele) => ele.path);
  }

  let userData = {
    username,
    password,
    email,
    profileImg,
  };
  const isExist = await User.findOne({ email: email });
  if (isExist) {
    return res.send({ user: isExist, msg: "User already exists" });
  } else {
    let data = await User.create(userData);
    return res.cookie("id", data.id).redirect("/user/index");
    // res.cookie("id", data.id).send({ data, msg: "logged in successfully" })
  }
};

const updateUser = async (req, res) => {
  let { id } = req.params;
  let data = await User.findByIdAndUpdate(id, req.body, { new: true });
  res.send(data);
};

const deleteUser = async (req, res) => {
  let { id } = req.params;
  let data = await User.findByIdAndDelete(id);
  res.send(data);
};

const storage = multer.diskStorage({
  destination: "uploade",
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
  },
});

const upload = multer({
  storage: storage,
});

// login

const loginUser = async (req, res) => {
  let { email, password } = req.body;
  let user = await User.findOne({ email: email });
  if (!user) {
    return res.send({ message: "User not found" });
  }
  if (user.password != password) {
    return res.send({ message: "password incorrect" });
  }

  return res.cookie("id", user.id).redirect("/user/index");
};

// send otp(one time password)
const otps = new Map();
const sendOtp = async () => {
  let { email } = req.body;
  let user = await User.findOne({ email });
  if (!user) {
    return res.send({ msg: "user not found" });
  } else {
    let otp = Math.round(Math.random() * 10000);
    otps.set(otps, email);
    console.log(otps);
    let html = ` <h1> otp : ${otp}</h1> <div> <a href="http://localhost:8090/user/reset">reset</a></div> `;
    sendingMail(email, "password reset", html);
  }
};


// reset password by otp
const resetPass = async () => {
  let { otp, password } = req.body;
  let { id } = req.cookie;
  let user = await User.findById(id);
  if (opt == otps.get(user.email)) {
    let newpass = await User.findByIdAndUpdate(
      id,
      { password: password },
      { new: true }
    );
    res.send(newpass, { msg: "open mail" });
  }
};
module.exports = {
  getUser,
  postUser,
  updateUser,
  deleteUser,
  upload,
  loginUser,
  sendOtp,
  resetPass,
};
