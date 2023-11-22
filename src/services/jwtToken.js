const jwt = require("jsonwebtoken");
const genneralAccessToken = async (payload) => {
  var accessToken = jwt.sign({ ...payload }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });
  return accessToken;
};
const genneralRefreshToken = async (payload) => {
  var refreshToken = jwt.sign({ ...payload }, process.env.JWT_SECRET, {
    expiresIn: "365d",
  });
  return refreshToken;
};
const requestRefreshToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(200).json({
      status: "ERR",
      message: "The token is required",
    });
  }
  jwt.verify(refreshToken, process.env.JWT_SECRET, async (err, user) => {
    if (err)
      res.json({
        status: "ERR",
        message: "The authemtication",
      });
    const accessToken = await genneralAccessToken({
      id: user.id,
      isAdmin: user.isAdmin,
    });
    // const newRefreshToken = await genneralRefreshToken({
    //   id: user.id,
    //   isAdmin: user.isAdmin,
    // });
    res.json({ status: "OK", message: "SUCESS", accessToken });
  });
};
module.exports = {
  genneralAccessToken,
  genneralRefreshToken,
  requestRefreshToken,
};
