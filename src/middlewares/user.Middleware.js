const jwt = require("jsonwebtoken");
const _CONF = require("../configs/jwtConfig");
const userMiddleware = (req, res, next) => {
  const token = req.headers.token.split(" ")[1];
  const userId = req.params.id;
  jwt.verify(token, _CONF.SECRET, (err, user) => {
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
