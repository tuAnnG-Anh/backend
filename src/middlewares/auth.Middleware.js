const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.json({
        status: "ERR",
        message: "You are not authentication",
      });
    user?.isAdmin
      ? next()
      : res.json({
          status: "ERR",
          message: "You are not authentication",
        });
  });
};

module.exports = { authMiddleware };