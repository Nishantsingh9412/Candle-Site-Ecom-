import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SquarePen, Trash2, Plus, CircleX } from "lucide-react";
import toast from "react-hot-toast";

import {
  createSubCategoryAction,
  DeleteSubCategoryAction,
  GetAllSubCategoriesAction,
  UpdateSubCategoryAction,
} from "../../../redux/action/subCategory";
import EditSubCategoryModal from "./Components/EditSubCategoryModal";
import { GetAllCategoriesAction } from "../../../redux/action/category";

const SubCategoryAdmin = () => {
  const dispatch = useDispatch();
  const [subCategoryName, setSubCategoryName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({});

  // Get sub-categories and categories from Redux store
  const { subCategories } = useSelector(
    (state) => state.subCategory || { subCategories: [] }
  );
  
  const { categories } = useSelector(
    (state) => state.category || { categories: [] }
  );

  useEffect(() => {
    dispatch(GetAllSubCategoriesAction());
    // Fetch categories for dropdown
    // if (!categories.length) {
    //   dispatch({ type: "GET_ALL_CATEGORIES_REQUEST" }); // trigger fetch if not loaded
    // }
  }, [dispatch]);

  const handleEdit = (subCat) => {
    setEditData(subCat);
    setEditModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this sub-category?")) {
      dispatch(DeleteSubCategoryAction(id)).then((res) => {
        if (res.success) {
          toast.success("Sub-category deleted successfully");
          // dispatch(GetAllSubCategoriesAction());
        } else {
          toast.error(res?.message || "Error deleting sub-category");
        }
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subCategoryName.trim() || !categoryId) 
        return toast.error("All fields required")
    
    dispatch(
      createSubCategoryAction({
        subCategoryName: subCategoryName.trim(),
        category: categoryId,
      })
    ).then((res) => {
      if (res.success) {
        setSubCategoryName("");
        setCategoryId("");
        setShowModal(false);
        toast.success(res?.message);
        // dispatch(GetAllSubCategoriesAction());
      } else {
        toast.error(res?.message || "Failed to add sub-category");
      }
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!editData.subCategoryName.trim() || !editData.category)
      return toast.error("All fields required");
    dispatch(
      UpdateSubCategoryAction(editData._id, {
        subCategoryName: editData.subCategoryName.trim(),
        category: editData.category,
      })
    ).then((res) => {
      if (res.success) {
        setEditModal(false);
        toast.success(res?.message);
        // dispatch(GetAllSubCategoriesAction());
      } else {
        toast.error(res?.message || "Failed to update sub-category");
      }
    });
  };

 

  useEffect(() => {
    dispatch(GetAllCategoriesAction());
  }, []);

  console.log("Sub-Categories: ", subCategories);
  // console.log("Categories: ", categories);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sub-Category Management
          </h1>
          <button
            onClick={() => setShowModal(true)}
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg flex items-center cursor-pointer shadow-md transition duration-200"
          >
            <Plus className="mr-2" />
             Add Sub-Category
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Sub-Categories
            </h2>
          </div>
          <div className="overflow-x-auto">
            {subCategories.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No sub-categories found. Add your first sub-category!
              </p>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Sub-Category Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {subCategories.map((subCat, idx) => (
                    <tr key={subCat._id || idx} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {idx + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {subCat.subCategoryName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {
                          subCat?.category?.CategoryName
                        }
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEdit(subCat)}
                          className="text-blue-600 hover:text-blue-800 cursor-pointer mr-4"
                        >
                          <SquarePen />
                        </button>
                        <button
                          onClick={() => handleDelete(subCat._id)}
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
      {/* Add Modal (Right Side) */}
      {showModal && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setShowModal(false)}
          ></div>
          <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50">
            <div className="p-6 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Add New Sub-Category
                </h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600 cursor-pointer text-2xl"
                >
                  <CircleX />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
                <div className="mb-6">
                  <label
                    htmlFor="subCategoryName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Sub-Category Name
                  </label>
                  <input
                    id="subCategoryName"
                    type="text"
                    value={subCategoryName}
                    onChange={(e) => setSubCategoryName(e.target.value)}
                    placeholder="Enter sub-category name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="categoryId"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Category
                  </label>
                  <select
                    id="categoryId"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.CategoryName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mt-auto">
                  <button
                    type="submit"
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center cursor-pointer"
                  >
                    <Plus className="mr-2" />
                    Add Sub-Category
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
      {/* Edit Modal */}
      {editModal && (
        <EditSubCategoryModal
          // isOpen={editModal}
          onClose={() => setEditModal(false)}
          editData={editData}
          setEditData={setEditData}
          categories={categories}
          handleEditSubmit={handleEditSubmit}
        />
      )}
    </div>
  );
};

export default SubCategoryAdmin;
