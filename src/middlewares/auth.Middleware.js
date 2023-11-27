const jwt = require("jsonwebtoken");
const _CONF = require("../configs/jwtConfig");

const authMiddleware = (req, res, next) => {
  const token = req.headers.token?.split(" ")[1];
  jwt.verify(token, _CONF.SECRET, (err, user) => {
    if (err)
      return res.status(401).json({
        status: "ERR",
        message: "Token is expired!",
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
