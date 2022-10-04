const reviewRouter = require("express").Router();
const { requireSignIn } = require("../controllers/auth.controller");
const clientReviewCtrl = require("../controllers/clientReview.controller");
const upload = require("../middlewares/uploads/avatarUpload");
reviewRouter
  .route("/")
  .post(requireSignIn, upload.single("reviewImg"), clientReviewCtrl.create)
  .get(requireSignIn, clientReviewCtrl.list);

reviewRouter
  .route("/:reviewId")
  .get(requireSignIn, clientReviewCtrl.reviewByID)
  .patch(requireSignIn, clientReviewCtrl.update)
  .delete(requireSignIn, clientReviewCtrl.deleteReview);
module.exports = reviewRouter;
