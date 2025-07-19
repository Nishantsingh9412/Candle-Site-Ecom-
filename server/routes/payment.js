import express from "express";

import { requireAuth } from "../middleware/auth.js";
import {
  createOrder,
  verifyPayment,
  getUserOrders,
  GetPaymentStatus,
} from "../controller/paymentController.js";

const router = express.Router();

// Create Razorpay order
router.post("/create-order", requireAuth, createOrder);

// Verify payment
router.post("/verify-payment", requireAuth, verifyPayment);

// Get user orders
router.get("/orders", requireAuth, getUserOrders);

// Get payment status
router.get("/payment-status/:orderId", requireAuth, GetPaymentStatus);

export default router;
