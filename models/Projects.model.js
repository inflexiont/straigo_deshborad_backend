const mongoose = require("mongoose");

// create schema
const projectSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    subtitle: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    filters: {
      type: Array,
      required: true,
    },
    coverImage: {
      type: String,
    },
    galleryImages: {
      type: Array,
    },
    url: {
      type: String,
      required: [true, "URL is required"],
    },
    github_url: {
      type: String,
    },
    details: {
      type: String,
      required: [true, "details is required"],
    },
  },
  { timestamp: true }
);
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
