const authRoute = require("./auth.route");
const productRoute = require("./product.route");
const userRoute = require("./user.route");

const routes = (app) => {
  //render page home
  app.get("/", (req, res) => {
    res.render("home");
  });
  //route auth
  app.use("/api/auth", authRoute);
  app.use("/api/user", userRoute);
  app.use("/api/product", productRoute);
};
module.exports = routes;
