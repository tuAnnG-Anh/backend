const express = require("express");
const morgan = require("morgan");
const { engine } = require("express-handlebars");
const path = require("path");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const routes = require("./routes/app.route");
const connectDatabase = require("./configs/database");
var cookieParser = require("cookie-parser");
const { corsOptions } = require("./configs/cors");
// const { corsOptions } = require("./configs/cors");
dotenv.config();
const port = process.env.PORT;
const app = express();

//cors
app.use(cors(corsOptions));

//Template engine
//config template engine
const configHandlebar = { extname: ".hbs" };
app.engine("hbs", engine(configHandlebar));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

//cookie Parser
app.use(cookieParser());

//apply middleware body-parse
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

//HTTP logger
app.use(morgan("combined"));

//Static files
app.use(express.static(path.join(__dirname, "public")));

//Connect to mongodb
setTimeout(() => {
  connectDatabase();
}, 2000);
//Routes
routes(app);

app.listen(port, () => {
  console.log(`Example app listening at: http://localhost:${port}`);
});
