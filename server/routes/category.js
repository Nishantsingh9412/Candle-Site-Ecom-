import express from "express";

import {
  createCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
} from "../controller/categoryController.js";
import { requireAdmin } from "../middleware/admin.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// Route to create a new category
router.post("/create", requireAuth, requireAdmin, createCategory);
// Route to get a category by ID
router.get("/get-single-category/:id", getCategoryById);
// Route to get all categories
router.get("/get-all-categories", getAllCategories);
// Route to update category by ID
router.patch("/update-category/:id", requireAuth, requireAdmin, updateCategory);
// Route to delete a category by ID
router.delete("/delete-category/:id", requireAuth, requireAdmin, deleteCategory);

export default router;
