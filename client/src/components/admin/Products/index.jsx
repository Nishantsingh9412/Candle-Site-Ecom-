import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Plus, SquarePen, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

import CreateProductModal from './CreateProductModal';
import EditProductModal from './EditProductModal';
import { getAllProductsAction, deleteProductByIdAction } from '../../../redux/action/product';
import { GetAllCategoriesAction } from '../../../redux/action/category';
import { GetAllSubCategoriesAction } from '../../../redux/action/subCategory';

const ProductsAdmin = () => {
  const dispatch = useDispatch();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const { products } = useSelector((state) => state.product || { products: [] });
  const { categories } = useSelector((state) => state.category || { categories: [] });
  const { subCategories } = useSelector((state) => state.subCategory || { subCategories: [] });

  useEffect(() => {
    dispatch(getAllProductsAction());
    dispatch(GetAllCategoriesAction());
    dispatch(GetAllSubCategoriesAction());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProductByIdAction(id)).then((res) => {
        if (res.success) {
          toast.success('Product deleted successfully');
          dispatch(getAllProductsAction());
        } else {
          toast.error(res?.message || 'Error deleting product');
        }
      });
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setShowEditModal(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Product Management</h1>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg flex items-center cursor-pointer"
          >
            <Plus className="mr-2" /> Add Product
          </button>
        </div>
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">Products</h2>
          </div>
          <div className="overflow-x-auto">
            {products.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No products found. Add your first product!</p>
            ) : (
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">SubCategory</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.map((product, index) => (
                    <tr key={product._id || index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{index + 1}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{product.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">₹{product.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.category?.CategoryName || product.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{product.subCategory?.subCategoryName || product.subCategory}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button onClick={() => handleEdit(product)} className="text-blue-600 hover:text-blue-800 cursor-pointer mr-4">
                          <SquarePen />
                        </button>
                        <button onClick={() => handleDelete(product._id)} className="text-red-600 hover:text-red-800 cursor-pointer">
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
      {showCreateModal && (
        <CreateProductModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          categories={categories}
          subCategories={subCategories}
        />
      )}
      {showEditModal && editProduct && (
        <EditProductModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          product={editProduct}
          categories={categories}
          subCategories={subCategories}
        />
      )}
    </div>
  );
};

export default ProductsAdmin;
