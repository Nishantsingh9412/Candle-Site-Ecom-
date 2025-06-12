import express, { Router } from "express";

import {
  createReview,
  getAllReviews,
  getReviewsByProductId,
  UpdateReviewSingle,
  DeleteReview,
} from "../controller/reviewController.js";

const router = express.Router();

router.post("/create", createReview);
// GET SINGLE REVIEW BY PRODUCT ID
router.get("/get-single-review/:id", getReviewsByProductId);
// GET ALL REVIEWS
router.get("/get-all-reviews", getAllReviews);
// UPDATE REVIEW
router.patch("/update-review/:id", UpdateReviewSingle);
// DELETE REVIEW
router.delete("/delete-review/:id", DeleteReview);    

export default router;
