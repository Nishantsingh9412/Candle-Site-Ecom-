import mongoose from "mongoose";

import generateUniqueSKU from "../utils/sku.js";
import Product from "../models/Products.js";

export const createNewProduct = async (req, res) => {
  const {
    name,
    price,
    comparePrice,
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

    // if (rating && (rating < 0 || rating > 5)) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Rating must be between 0 and 5",
    //   });
    // }

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

    const sku = await generateUniqueSKU(name);

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

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .select("-__v -createdAt -updatedAt")
      .populate("category", "name")
      .populate("subCategory", "name")
      .sort({ createdAt: -1 });

    if (!products || products.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      result: products,
    });
  } catch (error) {
    console.error("Error retrieving products:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    
    return res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
  }

  try {
    const getProductSingle = await Product.findById(_id)
      .populate("category", "name")
      .populate("subCategory", "name");

    if (!getProductSingle) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      result: getProductSingle,
    });
  } catch (error) {
    console.error("Error retrieving product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const updateProductById = async (req, res) => {
  const { id: _id } = req.params;
  const {
    name,
    price,
    comparePrice,
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
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
  }
  try {
    const UpdatedProduct = await Product.findByIdAndUpdate(
      _id,
      {
        name,
        price,
        comparePrice,
        description,
        shippingDescription,
        instructions,
        additionalInfo,
        images,
        category,
        subCategory,
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
      },
      { new: true }
    )
      .populate("category", "name")
      .populate("subCategory", "name");
    if (!UpdatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      result: UpdatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const deleteProductById = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid product ID",
    });
  }

  try {
    const DeletedProduct = await Product.findByIdAndDelete(_id);

    if (!DeletedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      result: DeletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
