const projectsCtrl = require("../controllers/projects.controller");
const { requireSignIn } = require("../controllers/auth.controller");
const projectsRouter = require("express").Router();
projectsRouter
  .route("/")
  .post(requireSignIn, projectsCtrl.create)
  .get(requireSignIn, projectsCtrl.list);
projectsRouter
  .route("/:projectId")
  .get(requireSignIn, projectsCtrl.projectByID)
  .patch(requireSignIn, projectsCtrl.update)
  .delete(requireSignIn, projectsCtrl.deleteProject);

module.exports = projectsRouter;
