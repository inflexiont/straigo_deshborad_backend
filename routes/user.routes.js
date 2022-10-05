const userRouter = require("express").Router();
const userCtrl = require("../controllers/user.controller");

// routes path="/"
userRouter.route("/").get(userCtrl.list).post(userCtrl.create);
userRouter
  .route("/:userId")
  .get(userCtrl.read)
  .patch(userCtrl.update)
  .delete(userCtrl.remove);
module.exports = userRouter;
