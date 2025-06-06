import mongoose from "mongoose";

import generateUniqueSKU from "../utils/sku.js";
import Product from "../models/Products.js";


export const createNewProduct = async (req, res) => {
  const {
    name,
    price,
    comparePrice,
    rating,
    description,
    shippingDescription,
    instructions,
    additionalInfo,
    images,
    category,
    subCategory,
    weight,
    tags,
    isActive,
    isFeatured,
    metaTitle,
    metaDescription,
    slug,
    minOrderQuantity,
    maxOrderQuantity,
    shippingClass,
    totalSales,
  } = req.body;

  if (
    !name ||
    !price ||
    !description ||
    !shippingDescription ||
    !instructions ||
    !images ||
    !category ||
    !subCategory
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
    });
  }

  try {
    if (!mongoose.Types.ObjectId.isValid(category)) {
      return res.status(400).json({
        success: false,
        message: "Invalid category ID",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(subCategory)) {
      return res.status(400).json({
        success: false,
        message: "Invalid sub-category ID",
      });
    }

    if (comparePrice && price >= comparePrice) {
      return res.status(400).json({
        success: false,
        message: "Compare price must be greater than price",
      });
    }

    if (rating && (rating < 0 || rating > 5)) {
      return res.status(400).json({
        success: false,
        message: "Rating must be between 0 and 5",
      });
    }

    if (minOrderQuantity && minOrderQuantity < 1) {
      return res.status(400).json({
        success: false,
        message: "Minimum order quantity must be at least 1",
      });
    }

    if (maxOrderQuantity && maxOrderQuantity < minOrderQuantity) {
      return res.status(400).json({
        success: false,
        message:
          "Maximum order quantity cannot be less than minimum order quantity",
      });
    }

    const sku = generateUniqueSKU(name);

    if (!sku) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate unique SKU",
      });
    }

    const newProduct = await Product.create({
      name,
      price,
      comparePrice,
      rating,
      description,
      shippingDescription,
      instructions,
      additionalInfo,
      images,
      category,
      subCategory,
      sku,
      weight,
      tags,
      isActive: isActive || true, // Default to true if not provided
      isFeatured: isFeatured || false, // Default to false if not provided
      metaTitle,
      metaDescription,
      slug,
      minOrderQuantity: minOrderQuantity || 1, // Default to 1 if not provided
      maxOrderQuantity: maxOrderQuantity || null, // Default to null if not provided
      shippingClass,
      totalSales: totalSales || 0, // Default to 0 if not provided
    });

    if (!newProduct) {
      return res.status(500).json({
        success: false,
        message: "Failed to create product",
      });
    }
    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      result: newProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
