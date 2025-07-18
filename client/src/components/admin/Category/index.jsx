import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SquarePen } from "lucide-react";
import { Trash2 } from "lucide-react";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { CircleX } from "lucide-react";

import {
  createCategoryAction,
  DeleteCategoryAction,
  GetAllCategoriesAction,
  // getCategoriesAction
} from "../../../redux/action/category";
import EditCategoryModal from "./components/EditCategoryModal";

const index = () => {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState("");
  const [showModal, setShowModal] = useState(false);

  const [isOpen, setIsOpen] = useState(false);
  const [ShowEditModal, setShowEditModal] = useState(false);
  const [EditCategoryData, setEditCategoryData] = useState({});

  const UserToken = JSON.parse(localStorage.getItem("Profile"))?.token;
  console.log("Token: ----------------------------> ", UserToken);

  // Get categories from Redux store
  const { categories } = useSelector(
    (state) => state.category || { categories: [] }
  );

  useEffect(() => {
    // Fetch categories when component mounts
    dispatch(GetAllCategoriesAction());
  }, [dispatch]);

  const handleEdit = (category) => {
    // e.preventDefault();
    console.log("Edit Category:   -----------------------> ", category);
    setEditCategoryData(category);
    setIsOpen(true);
    setShowEditModal(true);
  };

  const handleConfirmDelete = (id) => {
    dispatch(DeleteCategoryAction(id))
      .then((res) => {
        if (res.success) {
          toast.success("Category Deleted Successfully");
        } else {
          toast.error("Error Deleting Category");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (id) => {
    // e.preventDefault();
    if (window.confirm("Are you sure you want to delete this category?")) {
      handleConfirmDelete(id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate category name
    const trimmedCategoryName = categoryName.trim();
    const categoryData = {
      CategoryName: trimmedCategoryName,
    };

    if (trimmedCategoryName) {
      dispatch(createCategoryAction(categoryData)).then((res) => {
        if (res.success) {
          setCategoryName("");
          setShowModal(false);
          toast.success(res?.message);
          // Refresh categories list
          dispatch(GetAllCategoriesAction());
        } else {
          toast.error(res?.message || "Failed to add category");
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Page Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Category Management
            </h1>
            <p className="text-gray-600"></p>
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center cursor-pointer"
          >
            <Plus className="mr-2" />
            Add Category
          </button>
        </div>

        {/* Categories Table */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Categories</h2>
          </div>

          <div className="overflow-x-auto">
            {categories.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No categories found. Add your first category!
              </p>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((category, index) => (
                    <tr
                      key={category._id || index}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {category.CategoryName || category.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(category)}
                          className="text-blue-600 hover:text-blue-800 cursor-pointer mr-4"
                        >
                          <SquarePen />
                        </button>
                        <button
                          onClick={() => handleDelete(category._id)}
                          className="text-red-600 hover:text-red-800 cursor-pointer"
                        >
                          <Trash2 />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
      {/* Right Side Modal */}
      {showModal && (
        <>
          {/* Modal Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowModal(false)}
          ></div>

          {/* Modal Content */}
          <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50 transform transition-transform duration-300">
            <div className="p-6 h-full flex flex-col">
              {/* Modal Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Add New Category
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer text-2xl"
                  aria-label="Close Modal"
                >
                  <CircleX />
                </button>
              </div>

              {/* Modal Form */}
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                <div className="mb-6">
                  <label
                    htmlFor="categoryName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Category Name
                  </label>
                  <input
                    id="categoryName"
                    type="text"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    placeholder="Enter category name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <div className="mt-auto">
                  <button
                    type="submit"
                    className="w-full bg-gray-600 hover:bg-gray-700 cursor-pointer text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center"
                  >
                    <Plus className="mr-2" />
                    Add Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      {/* Edit Category Modal */}
      {ShowEditModal && (
        <>
          <EditCategoryModal
            isOpen={true}
            onClose={() => setShowEditModal(false)}
            category={EditCategoryData}
            //  onSave={(updatedCategory) => {
            //   //  Handle save logic here
            //    console.log("Updated Category:", updatedCategory);
            //    setIsOpen(false);
            //  }}
          />
        </>
      )}
    </div>
  );
};

export default index;
