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
    // Average rating
    description: { type: String, required: true },
    shippingDescription: { type: String, required: true },
    instructions: { type: String, required: true },
    additionalInfo: { type: String, required: false },
    images: {
      // type: [{
      // url: { type: String, required: true },
      // public_id: { type: String, required: true },
      // }],
      type: [String], // Array of image URLs
      required: true,
      // Default image if none provided
      default: ["https://via.placeholder.com/480x634?text=Product+Image"],
    },
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
    sku: { type: String, unique: true, required: true }, // Stock Keeping Unit
    weight: { type: String }, // Product weight for shipping
    tags: [{ type: String }], // For search and filtering
    isActive: { type: Boolean, default: true }, // Enable/disable product
    isFeatured: { type: Boolean, default: false },
    metaTitle: { type: String }, // SEO
    metaDescription: { type: String }, // SEO
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    }, // URL friendly name
    minOrderQuantity: { type: Number, default: 1 },
    maxOrderQuantity: { type: Number },
    shippingClass: { type: String, enum: ["Free", "Standard", "Express"] }, // Free, Standard, Express
    totalSales: { type: Number, default: 0 }, // Track sales count
  },
  { timestamps: true }
);

export default mongoose.model("Product", ProductSchema);

// import mongoose from "mongoose";


// const ProductSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     brand: {
//       type: String,
//       required: true,
//       default: "Scented Gleam", // Default brand name
//     }, // Required for Google Merchant Center
//     price: { type: Number, required: true },
//     comparePrice: { type: Number }, // Original price for discount display
//     availability: {
//       type: String,
//       enum: ["in_stock", "out_of_stock", "preorder", "backorder"],
//       default: "in_stock",
//     }, // Required for Google Merchant Center
//     condition: {
//       type: String,
//       enum: ["new", "refurbished", "used"],
//       default: "new",
//     }, // Required if used/refurbished
//     gtin: { type: String }, // UPC/EAN/ISBN - strongly recommended
//     mpn: { type: String }, // Manufacturer Part Number - recommended
//     googleProductCategory: { type: String }, // Google's product taxonomy
//     productType: { type: String }, // Your custom category
//     Reviews: [
//       {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Review",
//       },
//     ],
//     // Average rating
//     description: { type: String, required: true },
//     shippingDescription: { type: String, required: true },
//     instructions: { type: String, required: true },
//     additionalInfo: { type: String, required: false },
//     images: {
//       type: [String], // Array of image URLs
//       required: true,
//       default: ["https://via.placeholder.com/480x634?text=Product+Image"],
//     },
//     additionalImages: {
//       type: [String], // Up to 10 additional product images
//       default: [],
//     },
//     color: { type: String }, // Product color for variants
//     size: { type: String }, // Product size for variants
//     material: { type: String }, // Product material
//     productHighlights: [{ type: String, maxlength: 150 }], // Key product features (max 100 highlights)
//     // Shipping dimensions for Google Merchant Center
//     shippingWeight: { type: String }, // e.g., "3 kg"
//     shippingLength: { type: String }, // e.g., "20 cm"
//     shippingWidth: { type: String },
//     shippingHeight: { type: String },
//     // ...existing code...
//     category: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Category",
//       required: true,
//     },
//     subCategory: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "SubCategory",
//       required: true,
//     },
//     // Additional fields
//     sku: { type: String, unique: true, required: true }, // Stock Keeping Unit
//     weight: { type: String }, // Product weight for shipping
//     tags: [{ type: String }], // For search and filtering
//     isActive: { type: Boolean, default: true }, // Enable/disable product
//     isFeatured: { type: Boolean, default: false },
//     metaTitle: { type: String }, // SEO
//     metaDescription: { type: String }, // SEO
//     slug: {
//       type: String,
//       required: true,
//       unique: true,
//       lowercase: true,
//       trim: true,
//     }, // URL friendly name
//     minOrderQuantity: { type: Number, default: 1 },
//     maxOrderQuantity: { type: Number },
//     shippingClass: { type: String, enum: ["Free", "Standard", "Express"] }, // Free, Standard, Express
//     totalSales: { type: Number, default: 0 }, // Track sales count
//   },
//   { timestamps: true }
// );
// export default mongoose.model("Product", ProductSchema);



// Merchante Center Testing 
// https://support.google.com/merchants/answer/7052112
// https://search.google.com/test/rich-results