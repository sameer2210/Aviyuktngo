const express = require("express");
const app = express();
const userRouter = require("./routes/user.routes");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", "./src/views");

app.use("/users", userRouter);
// app.use("/post", userRouter);

module.exports = app;
