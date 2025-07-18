import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    CategoryName: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);
