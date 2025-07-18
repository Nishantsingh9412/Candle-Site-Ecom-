import mongoose from "mongoose";
import review from "../models/review.js";

export const createReview = async (req, res) => {
  const {
    userID, // 24 digit user ID
    productId, // 24 digit product ID
    title, // Title of the review
    rating, // Rating out of 5
    comment, // Comment for the review
  } = req.body;

  if (
    !mongoose.Types.ObjectId.isValid(userID) ||
    !mongoose.Types.ObjectId.isValid(productId)
  ) {
    return res.status(400).json({
      success: false,
      message: "Invalid user ID or product ID",
    });
  }

  const alreadyExistingReview = await review.findOne({
    user: userID,
    product: productId,
  });
  
  if (alreadyExistingReview) {
    return res.status(400).json({
      success: false,
      message: "You have already reviewed this product",
    });
  }

  try {
    if (!title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    if (!rating) {
      return res.status(400).json({
        success: false,
        message: "Rating is required",
      });
    }

    const newReview = await review.create({
      user: userID,
      product: productId,
      title,
      rating,
      comment,
    });

    const populatedReview = await review
      .findById(newReview._id)
      .populate("user", "name email")
      .populate("product", "name price");

    if (!populatedReview) {
      return res.status(404).json({
        success: false,
        message: "something went wrong",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Review created successfully",
      result: populatedReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getReviewsByProductId = async (req, res) => {
  const { id: _id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
  }
  try {
    const reviews = await review
      .find({ product: _id })
      .populate("user", "name email")
      .populate("product", "name price");
    return res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      result: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await review
      .find()
      .populate("user", "name email")
      .populate("product", "name price");
    if (!reviews || reviews.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No reviews found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "All reviews fetched successfully",
      result: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const UpdateReviewSingle = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid review ID",
    });
  }

  const { title, rating, comment } = req.body;

  try {
    const updatedReview = await review.findByIdAndUpdate(
      _id,
      { title, rating, comment },
      { new: true }
    );

    if (!updatedReview) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review updated successfully",
      result: updatedReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const DeleteReview = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid review ID",
    });
  }

  try {
    const deletedReview = await review.findByIdAndDelete(_id);

    if (!deletedReview) {
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      result: deletedReview,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
