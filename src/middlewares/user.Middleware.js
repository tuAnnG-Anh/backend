const jwt = require("jsonwebtoken");
const userMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  const userId = req.params.id;
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err)
      return res.status(401).json({
        status: "ERR",
        message: "Token is expired!",
      });
    user?.isAdmin || user?.id === userId
      ? next()
      : res.json({
          status: "ERR",
          message: "You are not authentication",
        });
  });
};

module.exports = { userMiddleware };
