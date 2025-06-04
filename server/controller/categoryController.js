import mongoose from "mongoose";
import Category from "../models/category.js";

export const createCategory = async (req, res) => {
  const { CategoryName } = req.body;
  try {
    if (!CategoryName) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const existingCategory = await Category.findOne({ CategoryName });
    if (existingCategory) {
      return res.status(400).json({
        success: false,
        message: "Category already exists",
      });
    }

    const newCategory = await Category.create({ CategoryName });
    return res.status(201).json({
      success: true,
      message: "Category created successfully",
      result: newCategory,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err,
    });
  }
};

export const getCategoryById = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid category ID",
    });
  }

  try {
    const category = await Category.findById(_id);
    if (!category) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Category fetched successfully",
      result: category,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err,
    });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});
    if (!categories || categories.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No categories found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Categories fetched successfully",
        result: categories,
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err,
    });
  }
};

export const updateCategory = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid category ID",
    });
  }

  const { CategoryName } = req.body;

  try {
    if (!CategoryName) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      _id,
      { CategoryName },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      result: updatedCategory,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err,
    });
  }
};

export const deleteCategory = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid category ID",
    });
  }

  try {
    const deletedCategory = await Category.findByIdAndDelete(_id);
    if (!deletedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully",
      result: deletedCategory,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err,
    });
  }
};
