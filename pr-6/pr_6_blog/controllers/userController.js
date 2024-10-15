const User = require("../models/user.schema.js");

const signUp = async (req, res) => {
  let { username, email } = req.body;

  let existingUser = await User.findOne({ email: email, username: username });

  if (existingUser) {
    return res.send({ msg: "existingUser" });
  } else {
    let user = await User.create(req.body);
    res.cookie("role", user.role);
    res.cookie("id", user._id);
    res.redirect("/user/index");
  }
};

const getUser = async (req, res) => {
  let user = await User.find(req.body);
  res.send(user);
};

const login = async (req, res) => {
  let { email, password } = req.body;
  let isExixt = await User.findOne({ email: email });
  if (!isExixt) {
    return res.send({ msg: "user not found" });
  }
  if (password != isExixt.password) {
    return res.send({ msg: "password incorrect" });
  }
  res.cookie("role", isExixt.role);
  res.cookie("id", isExixt._id);
  // res.send(isExixt.username);
  res.redirect("/user/index");
};

const deleteById = async (req, res) => {
  let { id } = req.params;
  let user = await User.findByIdAndDelete(id);
  res.send(user);
};

module.exports = { signUp, getUser, login ,deleteById,};
