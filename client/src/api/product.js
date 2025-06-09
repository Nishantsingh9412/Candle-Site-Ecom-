import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL });

// Product APIs
export const CreateProductAPI = (newProduct) => API.post('/api/v1/product/create', newProduct);
export const GetAllProductsAPI = () => API.get('/api/v1/product/get-all-products');
export const GetProductByIdAPI = (id) => API.get(`/api/v1/product/get-product-single/${id}`);
export const UpdateProductByIdAPI = (id, updatedProduct) => API.patch(`/api/v1/product/update-product/${id}`, updatedProduct);
export const DeleteProductByIdAPI = (id) => API.delete(`/api/v1/product/delete-product/${id}`);
