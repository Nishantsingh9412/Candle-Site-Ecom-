import Razorpay from "razorpay";
import crypto from "crypto";

import Order from "../models/order.js";
import Payment from "../models/payment.js";
import Cart from "../models/cart.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

console.log(razorpay);

export const createOrder = async (req, res) => {
  try {
    const {
      orderItems,
      shippingAddress,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;
    const userId = req.user.id;

    // Create order in database first
    const order = new Order({
      userId,
      orderItems,
      shippingAddress,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      orderStatus: "Processing",
    });

    const savedOrder = await order.save();

    // Create Razorpay order
    const options = {
      amount: totalPrice * 100, // amount in paise
      currency: "INR",
      receipt: `order_${savedOrder._id}`,
    };

    const razorpayOrder = await razorpay.orders.create(options);

    // Create payment record
    const payment = new Payment({
      userId,
      orderId: savedOrder._id,
      razorpayOrderId: razorpayOrder.id,
      amount: totalPrice,
      currency: "INR",
      status: "created",
    });

    await payment.save();

    // Update order with payment info
    savedOrder.paymentInfo = payment._id;
    await savedOrder.save();

    res.json({
      success: true,
      orderId: razorpayOrder.id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      orderDbId: savedOrder._id,
      key: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      error: "Failed to create Razorpay order",
      details: error.message,
    });
  }
};

export const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderDbId,
    } = req.body;
    const userId = req.user.id;

    // Verify signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (isAuthentic) {
      // Update payment record
      await Payment.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id, userId },
        {
          razorpayPaymentId: razorpay_payment_id,
          razorpaySignature: razorpay_signature,
          status: "paid",
          paidAt: new Date(),
        }
      );

      // Update order status
      await Order.findByIdAndUpdate(orderDbId, {
        orderStatus: "Processing",
      });

      // Clear user's cart after successful payment
      await Cart.findOneAndUpdate({ userId }, { $set: { items: [] } });

      res.json({
        success: true,
        message: "Payment verified successfully",
      });
    } else {
      // Update payment as failed
      await Payment.findOneAndUpdate(
        { razorpayOrderId: razorpay_order_id, userId },
        {
          status: "failed",
          failureReason: "Signature verification failed",
        }
      );

      res.status(400).json({
        success: false,
        message: "Payment verification failed",
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    res
      .status(500)
      .json({ error: "Failed to verify payment", details: error.message });
  }
};

export const getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id;
    const orders = await Order.find({ userId })
      .populate("paymentInfo")
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching orders:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch orders", details: error.message });
  }
};

export const GetPaymentStatus = async (req, res) => {
  try {
    const { orderId } = req.params;
    const userId = req.user.id;

    const payment = await Payment.findOne({
      razorpayOrderId: orderId,
      userId,
    }).populate("orderId");

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.json({
      success: true,
      payment,
    });
  } catch (error) {
    console.error("Error fetching payment status:", error);
    res.status(500).json({
      error: "Failed to fetch payment status",
      details: error.message,
    });
  }
};
