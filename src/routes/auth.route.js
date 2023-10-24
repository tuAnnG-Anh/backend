const { registerUser, loginUser } = require("../controllers/auth.controller");
const { requestRefreshToken } = require("../services/jwtToken");
const authRoute = require("express").Router();

authRoute.post("/register", registerUser);
authRoute.post("/login", loginUser);
authRoute.post("/refresh-token", requestRefreshToken);

module.exports = authRoute;
