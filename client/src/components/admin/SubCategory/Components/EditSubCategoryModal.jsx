import React from "react";
import { CircleX } from "lucide-react";
//     if (window.confirm("Are you sure you want to delete this category?")) {

const EditSubCategoryModal = ({
  //   isOpen,
  onClose,
  editData,
  setEditData,
  categories,
  handleEditSubmit,
}) => {

    console.log("cats :           ----------------------> ", categories );
    console.log("editData :           ----------------------> ", editData );    

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      ></div>
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50">
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Edit Sub-Category
            </h2>
            <button
              onClick={() => setEditModal(false)}
              className="text-gray-400 hover:text-gray-600 cursor-pointer text-2xl"
            >
              <CircleX />
            </button>
          </div>
          <form onSubmit={handleEditSubmit} className="flex-1 flex flex-col">
            <div className="mb-6">
              <label
                htmlFor="editSubCategoryName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Sub-Category Name
              </label>
              <input
                id="editSubCategoryName"
                type="text"
                value={editData.subCategoryName || ""}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    subCategoryName: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="editCategoryId"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Category
              </label>
              <select
                id="editCategoryId"
                value={editData?.category?.CategoryName}
                onChange={(e) =>
                  setEditData({
                    ...editData,
                    category: e.target.value,
                  })
                }
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="">Select Category</option>
                {categories.map((cat) => (
                    <option 
                        key={cat._id} 
                        value={cat._id === editData?.category?._id ? cat?.CategoryName : ""}
                    >
                        {cat.CategoryName}   
                    </option>
                ))}
              </select>
            </div>
            <div className="mt-auto">
              <button
                type="submit"
                className="w-full bg-gray-600 hover:bg-gray-700  text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center cursor-pointer"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditSubCategoryModal;
