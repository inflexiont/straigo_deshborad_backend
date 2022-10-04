const mongoose = require("mongoose");

// create schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      match: [/.+\@.+\..+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: true,
      required: [true, "Password is required"],
    },
  },
  { timestamp: true }
);
const User = mongoose.model("User", userSchema);

module.exports = User;
