const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
    image: { type: Array, default: [] },
    type: { type: String, required: true },
    rating: { type: Number, default: 0 },
    description: { type: String },
    color: [
      {
        imageColor: { type: String },
        discount: { type: Number },
        selled: { type: Number },
        countInStock: { type: Number, required: true },
        price: { type: Number },
      },
    ],
  },
  {
    timestamps: true,
  }
);
const Product = mongoose.model("Product", productSchema);

module.exports = Product;
