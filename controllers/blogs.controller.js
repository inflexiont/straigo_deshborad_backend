const Blog = require("../models/Blogs.model");
const {
  createBlogService,
  updateBlogService,
  deleteBlogService,
} = require("../services/blogs.services");

// create a Blog
const create = async (req, res, next) => {
  try {
    const newBlog = await createBlogService(req, res);
    res.status(200).json({
      message: "Successfully Added review!",
      blog: newBlog,
    });
  } catch (err) {
    next(err);
  }
};
const list = async (req, res) => {
  try {
    let blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const blogByID = async (req, res) => {
  const blogId = req.params.blogId;
  try {
    let blog = await Blog.findById(blogId);
    if (!blog)
      return res.status("400").json({
        error: "blog not found",
      });
    return res.status("200").json(blog);
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve blog",
    });
  }
};
const update = async (req, res) => {
  try {
    const updatedBlog = await updateBlogService(req, res);
    res.status(200).json({
      message: "success",
      blog: updatedBlog,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};
const deleteBlog = async (req, res, next) => {
  try {
    deleteBlogService(req, res);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  create,
  list,
  update,
  blogByID,
  deleteBlog,
};
