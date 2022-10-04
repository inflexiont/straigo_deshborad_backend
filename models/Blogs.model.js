const mongoose = require("mongoose");

// create schema
const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: Array,
      required: true,
    },
    cover: {
      type: String,
    },
    thumb: {
      type: String,
      required: [true, "thumb image is required"],
    },
    details: {
      type: String,
      required: [true, "details is required"],
    },
  },
  { timestamp: true }
);
const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
