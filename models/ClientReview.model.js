const mongoose = require("mongoose");

// create schema
const reviewSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: [true, "Message is required"],
      minLength: 70,
    },
    star: {
      type: Number,

      required: [true, "Star is required"],
    },
    image: {
      type: String,
      required: [true, "Image is required"],
    },
  },
  { timestamp: true }
);
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
