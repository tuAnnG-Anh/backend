const Product = require("../models/product.models");
const getProductById = async (req, res) => {
  try {
    const prodcutId = req.params.id;
    if (!prodcutId) {
      return res.status(200).json({
        status: "ERR",
        message: "The prodcutId is required",
      });
    }
    const product = await Product.findOne({ _id: prodcutId });
    !product
      ? res.status({
          status: "ERR",
          message: "The product is not defined",
        })
      : res.json({
          status: "OK",
          message: "SUCESS",
          data: product,
        });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};
const getAllProducts = async (req, res) => {
  try {
    const product = await Product.find();
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
};
const updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const data = req.body;
    // const checkProduct = await Product.findOne({ _id: productId });
    // if (!checkProduct) return res.json("This product is not defind!");
    const product = await Product.findByIdAndUpdate(
      productId,
      data
      // , {
      // new: true,
      // upset: true,
      // }
    );
    product
      ? res.json({
          status: "OK",
          message: "SUCESS",
          data: product,
        })
      : res.json({
          status: "ERR",
          message: "This product is not defind!!",
        });
  } catch (err) {
    res.json(err);
  }
};
const createProduct = async (req, res) => {
  const { name, image, type, price, countInStock, description, discount } =
    req.body;
  try {
    if (!name || !type || !price) return res.json("The input is require!");
    const product = await Product.findOne({ name: name });
    if (product) return res.json("This product is already!");
    const newProduct = await new Product({
      name,
      type,
      countInStock: Number(countInStock),
      price,
      // rating,
      description,
      discount: Number(discount),
    });
    if (newProduct) {
      await newProduct.save();
      res.json({
        status: "OK",
        message: "SUCCESS",
        data: newProduct,
      });
    }
  } catch (err) {
    res.json();
  }
};
const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("Product deleted!");
  } catch (err) {
    res.status(500).json(err);
  }
};
module.exports = {
  getProductById,
  createProduct,
  updateProduct,
  getAllProducts,
  deleteProduct,
};
