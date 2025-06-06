import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    comparePrice: { type: Number }, // Original price for discount display
    // discount: { type: Number, default: 0 }, // Percentage discount
    Reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
    rating: { type: Number, default: 0, min: 0, max: 5 }, // Average rating
    description: { type: String, required: true },
    shippingDescription: { type: String, required: true },  
    instructions: { type: String, required: true }, 
    additionalInfo: { type: String, required: false },
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    // Additional fields
    sku: { type: String, unique: true , required: true}, // Stock Keeping Unit
    weight: { type: String }, // Product weight for shipping
    tags: [{ type: String }], // For search and filtering
    isActive: { type: Boolean, default: true }, // Enable/disable product
    isFeatured: { type: Boolean, default: false },
    metaTitle: { type: String }, // SEO
    metaDescription: { type: String }, // SEO
    slug: { type: String, requires:true , unique: true }, // URL friendly name
    minOrderQuantity: { type: Number, default: 1 },
    maxOrderQuantity: { type: Number },
    shippingClass: { type: String , enum: ["Free", "Standard", "Express"] }, // Free, Standard, Express
    totalSales: { type: Number, default: 0 }, // Track sales count
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);
