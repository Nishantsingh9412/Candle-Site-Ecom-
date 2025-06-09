import express from 'express';
import {
  createNewProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} from '../controller/productController.js';

const router = express.Router();

router.post('/create', createNewProduct);
router.get('/get-all-products', getAllProducts);
router.get('/get-product-single/:id', getProductById);
router.patch('/update-product/:id', updateProductById);
router.delete('/delete-product/:id', deleteProductById);

export default router;