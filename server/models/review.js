import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "Auth" },
  product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
  rating: { type: Number, min: 1, max: 5 },
  title: { type: String, required: true },
  comment: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Review", ReviewSchema);
