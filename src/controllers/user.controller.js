const User = require("../models/user.models.js");

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    if (!userId) {
      return res.status(200).json({
        status: "ERR",
        message: "The userId is required",
      });
    }
    const user = await User.findOne({ _id: userId });
    !user
      ? res.status({
          status: "ERR",
          message: "The user is not defined",
        })
      : res.json({
          status: "OK",
          message: "SUCESS",
          data: user,
        });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const getAllUsers = async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
};
const updateUser = async (req, res) => {
  try {
  } catch (err) {
    res.json(err);
  }
};
const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = { getUserById, updateUser, getAllUsers, deleteUser };
