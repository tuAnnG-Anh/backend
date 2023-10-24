const mongoose = require("mongoose");

const connectDatabase = () => {
  mongoose
    .connect(process.env.DB_CONNECT_STRING, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((conn) => {
      console.log(
        `Mongoose Database connected with Host: ${conn.connection.host}`
      );
    })
    .catch((error) => handleError(error));
  mongoose.connection.on("error", (err) => {
    console.log(err);
  });
};
module.exports = connectDatabase;
