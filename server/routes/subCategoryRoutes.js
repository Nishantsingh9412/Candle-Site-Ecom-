import express from "express";
import {
  createSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategoryById,
  updateSubCategory,
} from "../controller/subCatController.js";

const router = express.Router();

// Creating a new sub-category
router.post("/create", createSubCategory);
// Route to get a sub-category by ID
router.get("/get-single-sub-category/:id", getSubCategoryById);
// Route to get all sub-categories by category ID
router.get("/get-all-sub-categories", getAllSubCategories);
// Route to update sub-category by ID
router.patch("/update-sub-category/:id", updateSubCategory);
// Route to delete sub Category
router.delete("/delete-sub-category/:id", deleteSubCategory);

export default router;
