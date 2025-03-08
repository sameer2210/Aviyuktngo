const express = require("express");
const { createUser, loginUser } = require("../controller/user.controller");
const { authMiddleware } = require("../middleware/authMiddleware");
const router = express.Router();

//create get
router.get("/", (req, res) => {
  res.render("register");
});

router.post("/create", createUser);

router.get("/login", (req, res) => {
  res.render("login");
});
router.post("/login", loginUser);

router.get("/profile", authMiddleware, (req, res) => {
  res.render("profile");
});

module.exports = router;
