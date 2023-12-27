// Database package
const mongoose = require("mongoose");

// Connection with database
const database = (url) => {
  return mongoose
    .connect(url)
    .then(() => {
      const port = 27017;
      console.log(
        "\x1b[32m",
        `Your database was successfully connected with your server on port: ${port} :)`,
        "\x1b[0m"
      );
      console.log("=".repeat(100));
    })
    .catch((err) => {
      console.log(`You lost connection with your database => ${err} :(`);
      console.log("=".repeat(100));
    });
};

module.exports = {database}