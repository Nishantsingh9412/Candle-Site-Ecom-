import mongoose from "mongoose";

import Product from "../models/products.js";
import generateSlug from "../utils/slug.js";
import generateUniqueSKU from "../utils/sku.js";

export const createNewProduct = async (req, res) => {
  const {
    name,
    brand,
    price,
    comparePrice,
    availability,
    condition,
    gtin,
    mpn,
    googleProductCategory,
    productType,
    description,
    shippingDescription,
    instructions,
    additionalInfo,
    additionalImages,
    color,
    size,
    material,
    productHighlights,
    shipping_weight,
    shipping_length,
    shipping_width,
    shipping_height,
    category,
    subCategory,
    tags,
    isActive,
    isFeatured,
    metaTitle,
    metaDescription,
    minOrderQuantity,
    maxOrderQuantity,
    shippingClass,
    totalSales,
  } = req.body;

  const uploadedImages = req.files?.map((file) => file.filename);

  if (
    !name ||
    !price ||
    !description ||
    !shippingDescription ||
    !instructions ||
    !uploadedImages?.length ||
    !tags ||
    !category ||
    !subCategory
  ) {
    return res.status(400).json({
      success: false,
      message: "Please provide all required fields",
      errors: [
        !name && "Name is required",
        !price && "Price is required",
        !description && "Description is required",
        !shippingDescription && "Shipping description is required",
        !instructions && "Instructions are required",
        !uploadedImages?.length && "Images are required",
        !category && "Category is required",
        !subCategory && "Sub-category is required",
      ].filter(Boolean),
    });
  }

  // console.log("Images ", images);

  try {
    if (!mongoose.Types.ObjectId.isValid(category)) {
      console.log("Cat Id", category);
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

    // Generate a unique SKU for the product
    const sku = await generateUniqueSKU(name);

    if (!sku) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate unique SKU",
      });
    }

    // Generate a slug from the product name
    const slug = await generateSlug(name, Product);

    if (!slug) {
      return res.status(500).json({
        success: false,
        message: "something went wrong",
      });
    }

    // check if the slug already exists
    const existingProduct = await Product.findOne({
      slug,
    });

    if (existingProduct) {
      return res.status(400).json({
        success: false,
        message: "Product with this slug already exists",
      });
    }

    const newProduct = await Product.create({
      name,
      brand: brand || "Scented Gleam", // Default brand name
      price,
      comparePrice,
      availability: availability || "in_stock",
      condition: condition || "new",
      gtin,
      mpn,
      googleProductCategory,
      productType,
      description,
      shippingDescription,
      instructions,
      additionalInfo,
      images: uploadedImages,
      additionalImages: additionalImages ? additionalImages.split(',').map(img => img.trim()) : [],
      color,
      size,
      material,
      productHighlights: productHighlights ? productHighlights.split(',').map(highlight => highlight.trim()) : [],
      shipping_weight,
      shipping_length,
      shipping_width,
      shipping_height,
      category,
      subCategory,
      sku,
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
      .populate("category", "-createdAt -updatedAt")
      .populate("subCategory", "-createdAt -updatedAt")
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

export const getProductBySlug = async (req, res) => {
  const { slug } = req.params;
  if (!slug) {
    return res.status(400).json({
      success: false,
      message: "Slug is required",
    });
  }
  try {
    const productBySlug = await Product.find({ slug, isActive: true })
      .populate("category", "name")
      .populate("subCategory", "name");

    if (!productBySlug || productBySlug.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product retrieved successfully",
      result: productBySlug[0], // Assuming slug is unique, we return the first product
    });
  } catch (error) {
    console.error("Error retrieving product by slug:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error,
    });
  }
};

export const updateProductById = async (req, res) => {
  const { id: _id } = req.params;
  const {
    name,
    brand,
    price,
    comparePrice,
    availability,
    condition,
    gtin,
    mpn,
    googleProductCategory,
    productType,
    description,
    shippingDescription,
    instructions,
    additionalInfo,
    images,
    additionalImages,
    color,
    size,
    material,
    productHighlights,
    shipping_weight,
    shipping_length,
    shipping_width,
    shipping_height,
    category,
    subCategory,
    tags,
    isActive,
    isFeatured,
    metaTitle,
    metaDescription,
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
    const slug = await generateSlug(name, Product);

    // Check if a product with the same slug already exists
    const existingProductWithSlug = await Product.findOne({
      slug,
      _id: { $ne: _id }, // Exclude the current product being updated
    });

    if (existingProductWithSlug) {
      return res.status(400).json({
        success: false,
        message: "Product with same slug already exists",
      });
    }

    const UpdatedProduct = await Product.findByIdAndUpdate(
      _id,
      {
        name,
        brand: brand || "Scented Gleam",
        price,
        comparePrice,
        availability: availability || "in_stock",
        condition: condition || "new",
        gtin,
        mpn,
        googleProductCategory,
        productType,
        description,
        shippingDescription,
        instructions,
        additionalInfo,
        images,
        additionalImages: additionalImages ? (typeof additionalImages === 'string' ? additionalImages.split(',').map(img => img.trim()) : additionalImages) : [],
        color,
        size,
        material,
        productHighlights: productHighlights ? (typeof productHighlights === 'string' ? productHighlights.split(',').map(highlight => highlight.trim()) : productHighlights) : [],
        shipping_weight,
        shipping_length,
        shipping_width,
        shipping_height,
        category,
        subCategory,
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
