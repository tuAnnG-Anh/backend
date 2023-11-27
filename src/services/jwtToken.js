const jwt = require("jsonwebtoken");
const _CONF = require("../configs/jwtConfig.js");

const genneralAccessToken = async (payload) => {
  var accessToken = jwt.sign({ ...payload }, _CONF.SECRET, {
    expiresIn: "10s",
  });
  return accessToken;
};
const genneralRefreshToken = async (payload) => {
  var refreshToken = jwt.sign({ ...payload }, _CONF.SECRET_REFRESH, {
    expiresIn: "15s",
  });
  return refreshToken;
};
const requestRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).send({
      status: "ERR",
      message: "Invalid refresh token",
    });
  }
  jwt.verify(refreshToken, _CONF.SECRET_REFRESH, async (err, user) => {
    if (err)
      return res.status(401).send({
        status: "ERR",
        message: "The token is required",
      });
    const accessToken = await genneralAccessToken({
      id: user.id,
      isAdmin: user.isAdmin,
    });
    return res.send({ status: "OK", message: "SUCCESS", accessToken });
  });
};
module.exports = {
  genneralAccessToken,
  genneralRefreshToken,
  requestRefreshToken,
};
