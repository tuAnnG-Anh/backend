const {
  getProductById,
  updateProduct,
  getAllProducts,
  deleteProduct,
} = require("../controllers/product.controller");

const productRoute = require("express").Router();

productRoute.get("/", getAllProducts);
productRoute.get("/:id", getProductById);
productRoute.put("/:id", updateProduct);
productRoute.delete("/:id", deleteProduct);

module.exports = productRoute;
