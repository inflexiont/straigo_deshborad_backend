const mongoose = require("mongoose");
const { mongoUri } = require("../config/config");
const connectionDB = () => {
  //connection mongodb with mongoose
  return mongoose
    .connect(
      "mongodb+srv://straigo:BEA6O6db53t9Tw3o@cluster0.ngivkia.mongodb.net/?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log("database connected successfully");
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = connectionDB;
