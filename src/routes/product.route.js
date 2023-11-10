const {
  getProductById,
  updateProduct,
  getAllProducts,
  deleteProduct,
  createProduct,
} = require("../controllers/product.controller");
const { authMiddleware } = require("../middlewares/auth.Middleware");

const productRoute = require("express").Router();

productRoute.get("/", getAllProducts);
productRoute.get("/:id", getProductById);
productRoute.post("/create", authMiddleware, createProduct);
productRoute.put("/update/:id", authMiddleware, updateProduct);
// productRoute.put("/:id", updateProduct);
productRoute.delete("/:id", authMiddleware, deleteProduct);

module.exports = productRoute;
