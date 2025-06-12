import express from "express";
import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controller/categoryController.js";

const router = express.Router();

// Route to create a new category
router.post("/create", createCategory);
// Route to get a category by ID
router.get("/get-single-category/:id", getCategoryById);
// Route to get all categories
router.get("/get-all-categories", getAllCategories);
// Route to update category by ID
router.patch("/update-category/:id", updateCategory);
// Route to delete a category by ID
router.delete("/delete-category/:id", deleteCategory);

export default router;
