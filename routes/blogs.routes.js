const upload = require("../middlewares/uploads/avatarUpload");
const blogsCtrl = require("../controllers/blogs.controller");
const { requireSignIn } = require("../controllers/auth.controller");
const blogsRouter = require("express").Router();
blogsRouter
  .route("/")
  .post(requireSignIn, blogsCtrl.create)
  .get(requireSignIn, blogsCtrl.list);
blogsRouter
  .route("/:blogId")
  .get(requireSignIn, blogsCtrl.blogByID)
  .patch(requireSignIn, blogsCtrl.update)
  .delete(requireSignIn, blogsCtrl.deleteBlog);
module.exports = blogsRouter;
