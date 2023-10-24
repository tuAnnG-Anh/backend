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
const updateProduct = async (req, res) => {
  try {
  } catch (err) {
    res.json(err);
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
  updateProduct,
  getAllProducts,
  deleteProduct,
};
