const mongoose = require("mongoose");
const { mongoUri } = require("../config/config");
const connectionDB = () => {
  //connection mongodb with mongoose
  return mongoose
    .connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("database connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectionDB;
