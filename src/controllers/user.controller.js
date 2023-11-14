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
    let { _page, _size, sort } = req.query;

    // If the page is not applied in query.
    if (!_page) {
      // Make the Default value one.
      _page = 1;
    }
    if (!_size) {
      _size = 10;
    }
    //  We have to make it integer because
    // query parameter passed is string
    const limit = parseInt(_size);
    const skip = _page * limit - limit;
    // We pass 1 for sorting data in
    // ascending order using ids
    // const user = await User.find().sort({ votes: 1, _id: 1 }).limit(limit);
    const totalItem = await User.find().count();
    const totalPage = Math.ceil(totalItem / limit);
    // console.log(orderCount);
    const users = await User.find().skip(skip).limit(limit);
    const dataUsers = users.map((user) => {
      const { password, ...other } = user._doc;
      return other;
    });
    res.send({
      currentPage: _page,
      limit: _size,
      data: dataUsers,
      totalItem: totalItem,
      totalPage: totalPage,
    });
  } catch (error) {
    res.sendStatus(500);
  }
};
const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const data = req.body;
    if (!userId)
      res.json({
        status: "ERR",
        message: "The userId is required!",
      });
    const checkUser = await User.findOne({
      _id: userId,
    });
    if (!checkUser)
      return res.json({
        status: "ERR",
        message: "The user is not defind!",
      });
    const response = await User.findByIdAndUpdate(userId, data, { new: true });
    return res.json({
      status: "OK",
      message: "SUCCESS",
      data: response,
    });
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
