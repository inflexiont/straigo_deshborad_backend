const Review = require("../models/ClientReview.model");
const cloudinary = require("../utils/cloudinary");
const createReviewService = async (req, res) => {
  let newReview;
  const { name, company, message, star, position } = req.body;
  console.log(req.body);
  // Upload image to cloudinary
  const photo = await cloudinary.uploader.upload(req.file.path);

  // create
  newReview = new Review({
    image: photo.secure_url,
    name,
    company,
    message,
    star,
    position,
    cloudinary_id: photo.public_id,
  });

  return await newReview.save();
};

const updateReviewService = async (req, res) => {
  const reviewId = req.params.reviewId;
  const {
    name: newName,
    company: newCompany,
    message: newMessage,
    star: newStar,
    position: newPosition,
  } = req.body;

  const review = await Review.findById(reviewId);
  if (!review) return res.status(404).json({ message: "review is not found" });
  if (review) {
    const { name, company, message, star, position } = review;

    const update = {
      name: newName ?? name,
      company: newCompany ?? company,
      message: newMessage ?? message,
      star: newStar ?? star,
      position: newPosition ?? position,
    };

    return Review.findByIdAndUpdate(reviewId, update, { new: true });
  } else {
    if (!review)
      return res.status(400).json({ message: "review is not found" });
  }
};
const deleteReviewService = async (req, res) => {
  let reviewId = req.params.reviewId;
  const review = await Review.findById(reviewId);
  if (!review) {
    return res.status(400).json({ message: "not found review" });
  }
  await Review.deleteOne({ id: reviewId });
  return res.status(203).json({ message: "success" });
};
module.exports = {
  createReviewService,
  updateReviewService,
  deleteReviewService,
};
