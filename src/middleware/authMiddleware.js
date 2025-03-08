const jwt = require("jsonwebtoken");

module.exports.authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    res.send(`user unauthorized token not found`);
  }
  const decode = jwt.verify(token, "secret-key");
  req.user = decode;
  next();
};
