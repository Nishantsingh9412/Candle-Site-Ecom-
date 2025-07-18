import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Plus, SquarePen, Trash2, CircleX } from "lucide-react";
import toast from "react-hot-toast";

import {
  getAllCollectionsAction,
  createCollectionAction,
  updateCollectionAction,
  deleteCollectionAction,
} from "../../../redux/action/collections";
import { getAllProductsAction } from "../../../redux/action/product";

const CollectionModal = ({ isOpen, onClose, onSubmit, initialData, products }) => {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    image: initialData?.image || "",
    products: initialData?.products ? initialData.products.map(p => p._id || p) : [],
  });

  useEffect(() => {
    setForm({
      title: initialData?.title || "",
      description: initialData?.description || "",
      image: initialData?.image || "",
      products: initialData?.products ? initialData.products.map(p => p._id || p) : [],
    });
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleProductToggle = (id) => {
    setForm((prev) => ({
      ...prev,
      products: prev.products.includes(id)
        ? prev.products.filter((pid) => pid !== id)
        : [...prev.products, id],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim() || !form.image.trim()) {
      toast.error("All fields are required");
      return;
    }
    onSubmit(form);
  };

  if (!isOpen) return null;
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose}></div>
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl z-50">
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {initialData ? "Edit Collection" : "Add Collection"}
            </h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 cursor-pointer text-2xl">
              <CircleX />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Products</label>
              <div className="max-h-32 overflow-y-auto border rounded p-2 bg-gray-50">
                {products.map((p) => (
                  <label key={p._id} className="flex items-center gap-2 text-sm mb-1">
                    <input
                      type="checkbox"
                      checked={form.products.includes(p._id)}
                      onChange={() => handleProductToggle(p._id)}
                    />
                    {p.name}
                  </label>
                ))}
              </div>
            </div>
            <div className="mt-auto">
              <button
                type="submit"
                className="w-full bg-gray-600 hover:bg-gray-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center cursor-pointer"
              >
                {initialData ? "Save Changes" : "Add Collection"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

const CollectionsAdmin = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const { collections } = useSelector((state) => state.collections || { collections: [] });
  const { products } = useSelector((state) => state.product || { products: [] });

  useEffect(() => {
    dispatch(getAllCollectionsAction());
    dispatch(getAllProductsAction());
  }, [dispatch]);

  const handleAdd = () => {
    setEditData(null);
    setShowModal(true);
  };

  const handleEdit = (collection) => {
    setEditData(collection);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this collection?")) {
      dispatch(deleteCollectionAction(id)).then((res) => {
        if (res.success) {
          toast.success("Collection deleted successfully");
          dispatch(getAllCollectionsAction());
        } else {
          toast.error(res?.message || "Error deleting collection");
        }
      });
    }
  };

  const handleSubmit = (form) => {
    if (editData) {
      dispatch(updateCollectionAction(editData._id, form)).then((res) => {
        if (res.success) {
          toast.success("Collection updated successfully");
          setShowModal(false);
          dispatch(getAllCollectionsAction());
        } else {
          toast.error(res?.message || "Error updating collection");
        }
      });
    } else {
      dispatch(createCollectionAction(form)).then((res) => {
        if (res.success) {
          toast.success("Collection added successfully");
          setShowModal(false);
          dispatch(getAllCollectionsAction());
        } else {
          toast.error(res?.message || "Error adding collection");
        }
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Collections Management</h1>
          <button
            onClick={handleAdd}
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg flex items-center cursor-pointer shadow-md transition duration-200"
          >
            <Plus className="mr-2" /> Add Collection
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {collections && collections.length > 0 ? (
                collections.map((col, idx) => (
                  <tr key={col._id || idx} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{idx + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{col.title}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 max-w-xs truncate">{col.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {col.image && (
                        <img src={col.image} alt={col.title} className="w-16 h-12 object-cover rounded" />
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {col.products && col.products.length > 0
                        ? col.products.map((p) => p.name || p).join(", ")
                        : "-"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => handleEdit(col)}
                        className="text-blue-600 hover:text-blue-800 cursor-pointer mr-4"
                      >
                        <SquarePen />
                      </button>
                      <button
                        onClick={() => handleDelete(col._id)}
                        className="text-red-600 hover:text-red-800 cursor-pointer"
                      >
                        <Trash2 />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-400">
                    No collections found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <CollectionModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit}
        initialData={editData}
        products={products}
      />
    </div>
  );
};

export default CollectionsAdmin;
