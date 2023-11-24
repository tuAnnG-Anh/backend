const jwt = require("jsonwebtoken");
const genneralAccessToken = async (payload) => {
  var accessToken = jwt.sign({ ...payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
  return accessToken;
};
const genneralRefreshToken = async (payload) => {
  var refreshToken = jwt.sign({ ...payload }, process.env.JWT_SECRET, {
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
  jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, user) => {
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
