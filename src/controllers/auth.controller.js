const User = require("../models/user.models.js");
const bcrypt = require("bcrypt");
const {
  genneralAccessToken,
  genneralRefreshToken,
} = require("../services/jwtToken.js");

const registerUser = async (req, res) => {
  try {
    const { email, name, password, confirmPassword } = req.body;
    var emailRegex =
      /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
    const isCheckEmail = emailRegex.test(email);
    if (!email || !name || !password || !confirmPassword)
      return res.status(200).json({
        status: "ERR",
        message: "The input is require!",
      });
    //valid user request
    if (!isCheckEmail)
      return res.status(200).json({
        status: "ERR",
        message: "This email is invalid!",
      });
    const validUser = await User.findOne({ email: email });
    if (validUser)
      return res.status(200).json({
        status: "ERR",
        message: "The email is already!",
      });

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    //Create new user
    const newUser = new User({
      email,
      name,
      password: hash,
    });

    //Save user to db
    const user = await newUser.save();
    return res.json({
      status: "OK",
      message: "Success",
      data: user,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(200).json({
        status: "ERR",
        message: "Wrong username / password!",
      });
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(200).json({
        status: "ERR",
        message: "The password or user is incorrect!",
      });
    } else {
      const accessToken = await genneralAccessToken({
        id: user.id,
        isAdmin: user.isAdmin,
      });
      const refreshToken = await genneralRefreshToken({
        id: user.id,
        isAdmin: user.isAdmin,
      });
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      return res.status(200).json({
        status: "OK",
        message: "Success",
        accessToken,
        // refreshToken,
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};
const logOutUser = async (req, res) => {
  try {
    res.clearCookie("refreshToken");
    return res.json({
      status: "OK",
      message: "Logout successfully!",
    });
  } catch (err) {
    res.json({
      status: "ERR",
      message: err,
    });
  }
};
module.exports = { registerUser, loginUser, logOutUser };
