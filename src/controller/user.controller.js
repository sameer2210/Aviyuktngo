const userModel = require("../model/user.model");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

module.exports.createUser = async (req, res) => {
  const { userName, email, password } = req.body;

  const userExist = await userModel.findOne({ email });

  if (userExist) {
    res.send(`user already exist`);
  }
  const hashPassword = await bcryptjs.hash(password, 10);

  const newUser = await userModel.create({
    userName,
    email,
    password: hashPassword
  });

  const token = jwt.sign(
    {
      id: newUser._id,
      email: newUser.email
    },
    "key"
  );

  res.cookie("token", token);
  res.redirect("/users/login");
};

module.exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  const userExist = await userModel.findOne({ email });
  if (!userExist) {
    res.redirect("/users/");
  }
  const isMatch = await bcryptjs.compare(password, userExist.password);

  if (!isMatch) {
    res.send(`password not match please try again`);
  }
  const token = jwt.sign(
    {
      id: userExist._id,
      email: userExist.email
    },
    "secret-key"
  );

  res.cookie("token", token);
  res.redirect("/users/profile");
};
