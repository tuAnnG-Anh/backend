const {
  getUserById,
  updateUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/user.controller");
const { userMiddleware } = require("../middlewares/user.Middleware");

const userRoute = require("express").Router();

userRoute.get("/", getAllUsers);
userRoute.get("/:id", userMiddleware, getUserById);
userRoute.put("/update/:id", updateUser);
userRoute.delete("/:id", deleteUser);
userRoute.post("/", (req, res) => {
  res.json({
    success: true,
  });
});
module.exports = userRoute;
