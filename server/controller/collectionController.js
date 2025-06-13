import mongoose from "mongoose";

import ProductCollection from "../models/collections.js";
import generateSlug from "../utils/slug.js";

export const createCollection = async (req, res) => {
  const { title, description, image, products } = req.body;

  try {
    if (!title || !description || !image || !products) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
        errors: [
          !title && "Title is required",
          !description && "Description is required",
          !image && "Image is required",
          !products && "Products are required",
        ].filter(Boolean),
      });
    }

    // Create a slug from the title
    const slug = await generateSlug(title, ProductCollection);

    // check if collection with the same slug already exists
    const existingSlug = await ProductCollection.findOne({
      slug,
    });

    // If a collection with the same title exists, return an error
    if (existingSlug) {
      return res.status(400).json({
        success: false,
        message: "Collection with this title already exists",
      });
    }

    const newCollection = await ProductCollection.create({
      title,
      description,
      slug,
      image,
      products,
    });

    await newCollection.populate("products");

    if (!newCollection) {
      return res.status(500).json({
        success: false,
        message: "Failed to create collection",
      });
    }

    return res.status(201).json({
      success: true,
      message: "Collection created successfully",
      result: newCollection,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const getAllCollections = async (req, res) => {
  try {
    const collections = await ProductCollection.find({}).populate("products");

    if (!collections || collections.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No collections found",
      });
    }

    return res.status(200).json({
      success: true,
      result: collections,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const getCollectionBySlug = async (req, res) => {
  const { slug } = req.params;

  try {
    const collectionSingle = await ProductCollection.findOne({ slug }).populate(
      "products"
    );

    if (!collectionSingle) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }
    return res.status(200).json({
      success: true,
      result: collectionSingle,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const getCollectionById = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid collection ID",
    });
  }

  try {
    const collectionSingle = await ProductCollection.findById(_id).populate(
      "products"
    );

    if (!collectionSingle) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    return res.status(200).json({
      success: true,
      result: collectionSingle,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const updateCollection = async (req, res) => {
  const { id: _id } = req.params;
  const { 
    title,
    description,
    image,
    products
  } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid collection ID",
    });
  }

  try {
    const slug = await generateSlug(title, ProductCollection);

    // Check if a collection with the same slug already exists
    const existingCollectionWithSlug = await ProductCollection.findOne({
      slug,
      _id: { $ne: _id }, // Exclude the current collection being updated
    });

    if (existingCollectionWithSlug) {
      return res.status(400).json({
        success: false,
        message: "Collection with same slug already exists",
      });
    }

    const updatedCollection = await ProductCollection.findByIdAndUpdate(
      _id,
      { title, description, slug, image, products },
      { new: true }
    );

    if (!updatedCollection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Collection updated successfully",
      result: updatedCollection,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};

export const deleteCollection = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid collection ID",
    });
  }

  try {
    const deletedCollection = await ProductCollection.findByIdAndDelete(_id);

    if (!deletedCollection) {
      return res.status(404).json({
        success: false,
        message: "Collection not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Collection deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err.message,
    });
  }
};
