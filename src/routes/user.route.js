const {
  getUserById,
  updateUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/user.controller");

const userRoute = require("express").Router();

userRoute.get("/", getAllUsers);
userRoute.get("/:id", getUserById);
userRoute.put("/update/:id", updateUser);
userRoute.delete("/:id", deleteUser);

module.exports = userRoute;
