const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema(
  {
    id_user: { type: String, required: true, unique },
    id_product: { type: String, required: true, unique },
    feedback: { type: String },
  },
  {
    timestamps: true,
  }
);
const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
