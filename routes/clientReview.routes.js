const reviewRouter = require("express").Router();
const { requireSignIn } = require("../controllers/auth.controller");
const clientReviewCtrl = require("../controllers/clientReview.controller");

reviewRouter
  .route("/")
  .post(requireSignIn, clientReviewCtrl.create)
  .get(requireSignIn, clientReviewCtrl.list);

reviewRouter
  .route("/:reviewId")
  .get(requireSignIn, clientReviewCtrl.reviewByID)
  .patch(requireSignIn, clientReviewCtrl.update)
  .delete(requireSignIn, clientReviewCtrl.deleteReview);
module.exports = reviewRouter;
