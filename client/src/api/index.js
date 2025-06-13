import axios from 'axios'

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL })

// For authentication purpose  

// API.interceptors.request.use((req) => {
//     if (localStorage.getItem('Profile')) {
//         req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('Profile')).token}`;
//     }    
//     return req;
// });

// End For Authentication Purpose

// Authentication API's 
export const SignupAPI = (newUser) => API.post('/api/v1/auth/signup', newUser)

export const LoginAPI = (logindata) => API.post('/api/v1/auth/login', logindata)

export const sendOTPAPI = (email) => API.post('/api/v1/otp/send-otp', email)

// Category API's 
// Create new 
export const CreateCategoryAPI = (newCategory) => API.post('/api/v1/category/create', newCategory)
// Get all categories 
export const GetAllCategoriesAPI = () => API.get('/api/v1/category/get-all-categories')
// Get Categories by Id 
export const GetCategoryByIdAPI = (id) => API.get(`/api/v1/category/get-single-category/${id}`)
// Update Category by Id
export const UpdateCategoryByIdAPI = (id, updatedCategory) => API.patch(`/api/v1/category/update-category/${id}`, updatedCategory)
// Delete Category 
export const DeleteCategoryByIdAPI = (id) => API.delete(`/api/v1/category/delete-category/${id}`)


// Sub-Category API's
// Create new sub-category
export const CreateSubCategoryAPI = (newSubCategory) => API.post('/api/v1/sub-category/create', newSubCategory)
// Get all sub-categories
export const GetAllSubCategoriesAPI = () => API.get('/api/v1/sub-category/get-all-sub-categories')
// Get Sub-Category by Id
export const GetSubCategoryByIdAPI = (id) => API.get(`/api/v1/sub-category/get-single-sub-category/${id}`)
// Update Sub-Category by Id
export const UpdateSubCategoryByIdAPI = (id, updatedSubCategory) => API.patch(`/api/v1/sub-category/update-sub-category/${id}`, updatedSubCategory)
// Delete Sub-Category by Id
export const DeleteSubCategoryByIdAPI = (id) => API.delete(`/api/v1/sub-category/delete-sub-category/${id}`)


// Product APIs
// Create new product
export const CreateProductAPI = (newProduct) => API.post('/api/v1/products/create', newProduct);
// Get all products
export const GetAllProductsAPI = () => API.get('/api/v1/products/get-all-products');
// Get Product by Id
export const GetProductByIdAPI = (id) => API.get(`/api/v1/products/get-product-single/${id}`);
// Get Product by Slug
export const GetProductBySlugAPI = (slug) => API.get(`/api/v1/products/get-product-by-slug/${slug}`);
// Update Product by Id
export const UpdateProductByIdAPI = (id, updatedProduct) => API.patch(`/api/v1/products/update-product/${id}`, updatedProduct);
// Delete Product by Id
export const DeleteProductByIdAPI = (id) => API.delete(`/api/v1/products/delete-product/${id}`);


// Collection APIs
// Create new Collection
export const CreateCollectionAPI = (newCollection) => API.post('/api/v1/collections/create', newCollection);
// Get all Collections
export const GetAllCollectionsAPI = () => API.get('/api/v1/collections/get-all-collections');
// Get Collection by Id
export const GetCollectionByIdAPI = (id) => API.get(`/api/v1/collections/get-collection-by-id/${id}`);
// Update Collection by Id
export const UpdateCollectionByIdAPI = (id, updatedCollection) => API.patch(`/api/v1/collections/update-collection/${id}`, updatedCollection);
// Delete Collection by Id
export const DeleteCollectionByIdAPI = (id) => API.delete(`/api/v1/collections/delete-collection/${id}`);
