import React, { useState } from 'react'
import { CircleX } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { UpdateCategoryAction } from '../../../../redux/action/category';
import toast from 'react-hot-toast';

const EditCategoryModal = ({ isOpen, onClose, category, onSave }) => {
    
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: category?.CategoryName || '',
        // description: category?.description || ''
    })
    console.log("category Latest : ", category)
    // console.log("EditCategory Data : ", formData)

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const updatedCatData = {
            CategoryName: formData.name,
        }
        dispatch(UpdateCategoryAction(category?._id, updatedCatData))
        .then((res) => {
            // console.log(res)
            if (res.success) {
                toast.success("Category Updated Successfully");
            }else{
                toast.error(res?.message || "Error Updating Category");
            }
        }).catch((err) => {
                console.log(err);
        }).finally(() => {
            // Reset form data after saving
            console.log("Category Action Called Successfully");
        })
        // onSave(formData)
        onClose();
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Edit Category  </h2>
                    <button className="text-gray-400 hover:text-gray-600 text-2xl cursor-pointer" onClick={onClose}>
                        <CircleX />
                    </button>
                </div>
                
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required
                        />
                    </div>
                    
                    {/* <div className="mb-6">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows="3"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                        />
                    </div>
                     */}
                    <div className="flex justify-end space-x-3">
                        <button 
                            type="button" 
                            className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors cursor-pointer"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="px-4 py-2 text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors cursor-pointer"
                        >
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditCategoryModal
