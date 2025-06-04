import mongoose from "mongoose";
import subCategory from "../models/subCategory.js";
  
export const createSubCategory = async (req, res) => {
  const { subCategoryName, category } = req.body;
  if (!mongoose.Types.ObjectId.isValid(category)) {
    return res.status(400).json({
      success: false,
      message: "Invalid category ID",
    });
  }

  try {
    if (!subCategoryName || !category) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }

    const existingSubCategory = await subCategory.findOne({
      subCategoryName,
      category,
    });

    if (existingSubCategory) {
      return res.status(400).json({
        success: false,
        message: "Sub-category already exists",
      });
    }

    const newSubCategory = await subCategory.create({
      subCategoryName,
      category,
    });
    return res.status(201).json({
      success: true,
      message: "Sub-category created successfully",
      result: newSubCategory,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err,
    });
  }
};

export const getSubCategoryById = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid sub-category ID",
    });
  }

  try {
    const subCategoryData = await subCategory.findById(_id);
    if (!subCategoryData) {
      return res.status(404).json({
        success: false,
        message: "Sub-category not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Sub-category fetched successfully",
      result: subCategoryData,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err,
    });
  }
};

export const getAllSubCategories = async (req, res) => {
  try {
    const subCategories = await subCategory.find({});
    return res.status(200).json({
      success: true,
      message: "Sub-categories fetched successfully",
      result: subCategories,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err,
    });
  }
};

export const updateSubCategory = async (req, res) => {
  const { id: _id } = req.params;
  const { subCategoryName, category } = req.body;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid sub-category ID",
    });
  }

  try {
    const updatedSubCategory = await subCategory.findByIdAndUpdate(
      _id,
      { subCategoryName, category },
      { new: true }
    );

    if (!updatedSubCategory) {
      return res.status(404).json({
        success: false,
        message: "Sub-category not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Sub-category updated successfully",
      result: updatedSubCategory,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err,
    });
  }
};

export const deleteSubCategory = async (req, res) => {
  const { id: _id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid sub-category ID",
    });
  }

  try {
    const deletedSubCategory = await subCategory.findByIdAndDelete(_id);
    if (!deletedSubCategory) {
      return res.status(404).json({
        success: false,
        message: "Sub-category not found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Sub-category deleted successfully",
      result: deletedSubCategory, 
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: err,
    });
  }
};
