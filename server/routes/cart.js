import express from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  syncCart,
} from "../controller/cartController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// All cart routes require authentication
router.use(requireAuth);

// Get user's cart
router.get("/", getCart);

// Add item to cart
router.post("/add", addToCart);

// Update item quantity
router.patch("/update", updateCartItem);

// Remove item from cart
router.delete("/remove/:productId", removeFromCart);

// Clear entire cart
router.delete("/clear", clearCart);

// Sync cart (bulk operations)
router.post("/sync", syncCart);

export default router;
