const Blog = require("../models/Blogs.model");
const createBlogService = async (req, res) => {
  let newBlog;
  const { title, category, details, thumb, cover } = req.body;

  // create
  newBlog = new Blog({
    thumb,
    title,
    date: new Date(),
    category,
    details,
    cover,
  });

  return await newBlog.save();
};
const updateBlogService = async (req, res) => {
  const blogId = req.params.blogId;
  const {
    title: newTitle,
    category: newCategory,
    details: newDetails,
  } = req.body;

  const blog = await Blog.findById(blogId);
  if (!blog) return res.status(404).json({ message: "Blog is not found" });
  if (blog) {
    const { title, category, details } = blog;
    const update = {
      title: newTitle ?? title,
      category: newCategory ?? category,
      details: newDetails ?? details,
    };

    return Blog.findByIdAndUpdate(blogId, update, { new: true });
  } else {
    if (!blog) return res.status(404).json({ message: "Blog is not found" });
  }
};
const deleteBlogService = async (req, res) => {
  let blogId = req.params.blogId;
  const blog = await Blog.findById(blogId);
  if (!blog) {
    return res.status(400).json({ message: "not found blog" });
  }
  await Blog.deleteOne({ id: blogId });
  return res.status(203).json({ message: "success" });
};
module.exports = { createBlogService, updateBlogService, deleteBlogService };
