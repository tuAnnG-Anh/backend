const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    email: { type: String, require: true, unique: true },
    name: { type: String, require: true },
    password: { type: String, require: true },
    isAdmin: { type: Boolean, require: true, default: false },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("User", userSchema);
