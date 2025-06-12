import mongoose from "mongoose";

import Collection from "../models/collections.js";

export const createCollection = async (req, res) => {
  const { title, description, image, products } = req.body;

  try {
    if (!title) {
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

    const newCollection = await Collection.create({
      title,
      description,
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
    const collections = await Collection.find({}).populate("products");

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

export const getCollectionById = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid collection ID",
    });
  }

  try {
    const collectionSingle = await Collection.findById(_id).populate(
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
  const { title, description, image, products } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid collection ID",
    });
  }

  try {
    const updatedCollection = await Collection.findByIdAndUpdate(
      _id,
      { title, description, image, products },
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
    const deletedCollection = await Collection.findByIdAndDelete(_id);

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
