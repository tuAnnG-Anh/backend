const {
  getUserById,
  updateUser,
  getAllUsers,
  deleteUser,
} = require("../controllers/user.controller");
const { authMiddleware } = require("../middlewares/auth.Middleware");
const { userMiddleware } = require("../middlewares/user.Middleware");

const userRoute = require("express").Router();

userRoute.get("/", authMiddleware, getAllUsers);
userRoute.get("/:id", userMiddleware, getUserById);
userRoute.put("/update/:id", updateUser);
userRoute.delete("/:id", deleteUser);
userRoute.post("/", (req, res) => {
  res.json({
    success: true,
  });
});
module.exports = userRoute;
