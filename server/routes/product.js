import express from "express";

import {
  createNewProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
  getProductBySlug,
} from "../controller/productController.js";
import { uploadImage } from "../middleware/fileUpload.js";
import { requireAuth } from "../middleware/auth.js";
import { requireAdmin } from "../middleware/admin.js";

const router = express.Router();

// Product Routes
// Create a new product
// router.post("/create", uploadImage("images", 2, true, 5), createNewProduct);
router.post(
  "/create",
  uploadImage({
    fieldName: "images",
    maxSizeMB: 2,
    multiple: true,
    maxCount: 5,
  }),
  requireAuth,
  requireAdmin,
  createNewProduct
);
// Get all products
router.get("/get-all-products", getAllProducts);
// Get a single product by ID
router.get("/get-product-single/:id", getProductById);
// Get a product by Slug
router.get("/get-product-by-slug/:slug", getProductBySlug);
// Update a product by ID
router.patch(
  "/update-product/:id",
  requireAuth,
  requireAdmin,
  updateProductById
);
// Delete a product by ID
router.delete(
  "/delete-product/:id",
  requireAuth,
  requireAdmin,
  deleteProductById
);

export default router;
