const {
  registerUser,
  loginUser,
  logOutUser,
} = require("../controllers/auth.controller");
const { requestRefreshToken } = require("../services/jwtToken");
const authRoute = require("express").Router();

authRoute.post("/register", registerUser);
authRoute.post("/login", loginUser);
authRoute.post("/logout", logOutUser);
authRoute.post("/refreshToken", requestRefreshToken);

module.exports = authRoute;
