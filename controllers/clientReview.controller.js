const Review = require("../models/ClientReview.model");
const {
  createReviewService,
  updateReviewService,
  deleteReviewService,
} = require("../services/clientReview.services");

// create a post
const create = async (req, res, next) => {
  try {
    const newReview = await createReviewService(req, res);
    res.status(200).json({
      message: "Successfully Added review!",
      review: newReview,
    });
  } catch (err) {
    next(err);
  }
};
const list = async (req, res) => {
  try {
    let users = await Review.find();
    res.json(users);
  } catch (err) {
    return res.status(400).json({
      error: errorHandler.getErrorMessage(err),
    });
  }
};
const reviewByID = async (req, res) => {
  const reviewId = req.params.reviewId;
  try {
    let review = await Review.findById(reviewId);
    if (!review)
      return res.status("400").json({
        error: "review not found",
      });
    return res.status("200").json(review);
  } catch (err) {
    return res.status("400").json({
      error: "Could not retrieve review",
    });
  }
};
const update = async (req, res) => {
  try {
    const updatedReview = await updateReviewService(req, res);
    res.status(200).json({
      message: "success",
      review: updatedReview,
    });
  } catch (err) {
    return res.status(400).json({
      error: err.message,
    });
  }
};
const deleteReview = async (req, res, next) => {
  try {
    deleteReviewService(req, res);
  } catch (err) {
    next(err);
  }
};
module.exports = {
  create,
  list,
  reviewByID,
  update,
  deleteReview,
};
