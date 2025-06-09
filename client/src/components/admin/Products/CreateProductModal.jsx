import React, { useState } from "react";
import { CircleX } from "lucide-react";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { createProductAction } from "../../../redux/action/product";

const TEST_PRODUCT = {
  name: "Test Candle",
  price: 299,
  comparePrice: 399,
  description: "A beautiful scented candle for your home.",
  shippingDescription: "Ships in 2-3 business days.",
  instructions: "Light the candle and enjoy the aroma.",
  additionalInfo: "Handmade with love.",
  category: "", // Set dynamically
  subCategory: "", // Set dynamically
  weight: "200g",
  tags: "aroma,relax,home",
  isActive: true,
  isFeatured: false,
  metaTitle: "Best Candle",
  metaDescription: "Buy the best scented candle online.",
  minOrderQuantity: 1,
  maxOrderQuantity: 10,
  shippingClass: "Standard",
};

const CreateProductModal = ({ isOpen, onClose, categories, subCategories }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    comparePrice: "",
    description: "",
    shippingDescription: "",
    instructions: "",
    additionalInfo: "",
    images: [],
    category: "",
    subCategory: "",
    weight: "",
    tags: "",
    isActive: true,
    isFeatured: false,
    metaTitle: "",
    metaDescription: "",
    minOrderQuantity: 1,
    maxOrderQuantity: "",
    shippingClass: "",
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTestFill = () => {
    setFormData({
      ...TEST_PRODUCT,
      category: categories[0]?._id || "",
      subCategory: subCategories[0]?._id || "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting product data:", formData);
    const testImages = [
      {
        url: "https://niana.co/cdn/shop/files/Amour4_compact.jpg?v=1707647515",
        public_id: "products/candle/amour4",
      },
      {
        url: "https://niana.co/cdn/shop/files/Amour3_compact.jpg?v=1707647506",
        public_id: "products/candle/amour3",
      },
    ];

    setFormData((prev) => ({
      ...prev,
      images: testImages,
    }));
    const productData = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };
    dispatch(createProductAction(productData)).then((res) => {
      if (res.success) {
        toast.success("Product created successfully");
        onClose();
      } else {
        toast.error(res?.message || "Error creating product");
      }
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl mx-4 flex flex-col border border-gray-200 animate-fadeIn"
        style={{
          maxHeight: "90vh",
          minHeight: "60vh",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          backdropFilter: "blur(8px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-6 border-b sticky top-0 bg-white z-10 rounded-t-3xl">
          <h2 className="text-2xl font-bold text-gray-800 tracking-tight">
            Add New Product
          </h2>
          <button
            className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
            onClick={onClose}
          >
            <CircleX />
          </button>
        </div>
        {/* Scrollable content area with custom scrollbar */}
        <div
          className="overflow-y-auto px-6 py-2 scrollbar-thin scrollbar-thumb-blue-300 scrollbar-track-gray-100"
          style={{ flex: 1, minHeight: 0, maxHeight: "calc(90vh - 80px)" }}
        >
          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
            <div className="col-span-2 flex justify-end mb-2">
              <button
                type="button"
                onClick={handleTestFill}
                className="px-3 py-1.5 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg shadow hover:from-blue-600 hover:to-indigo-600 transition-all text-xs font-semibold"
              >
                Fill Test Data
              </button>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Compare Price
              </label>
              <input
                type="number"
                name="comparePrice"
                value={formData.comparePrice}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition bg-gray-50"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.CategoryName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                SubCategory
              </label>
              <select
                name="subCategory"
                value={formData.subCategory}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition bg-gray-50"
              >
                <option value="">Select SubCategory</option>
                {subCategories.map((sub) => (
                  <option key={sub._id} value={sub._id}>
                    {sub.subCategoryName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition bg-gray-50"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition resize-none bg-gray-50"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shipping Description
              </label>
              <textarea
                name="shippingDescription"
                value={formData.shippingDescription}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition resize-none bg-gray-50"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Instructions
              </label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition resize-none bg-gray-50"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Info
              </label>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition resize-none bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Weight
              </label>
              <input
                type="text"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Min Order Quantity
              </label>
              <input
                type="number"
                name="minOrderQuantity"
                value={formData.minOrderQuantity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Max Order Quantity
              </label>
              <input
                type="number"
                name="maxOrderQuantity"
                value={formData.maxOrderQuantity}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Shipping Class
              </label>
              <select
                name="shippingClass"
                value={formData.shippingClass}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition bg-gray-50"
              >
                <option value="">Select Shipping Class</option>
                <option value="Free">Free</option>
                <option value="Standard">Standard</option>
                <option value="Express">Express</option>
              </select>
            </div>
            <div className="flex items-center col-span-2 gap-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isActive"
                  checked={formData.isActive}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Active
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="mr-2"
                />
                Featured
              </label>
            </div>
            <div className="col-span-2 flex justify-end space-x-3 mt-4">
              <button
                type="button"
                className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-xl border border-gray-300 transition-all"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-xl shadow transition-all font-semibold cursor-pointer flex items-center justify-center"
              >
                Add Product
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProductModal;
