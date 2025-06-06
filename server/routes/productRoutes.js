import express from 'express';
import {
  createNewProduct,
//   getAllProducts,
//   getProductById,
//   updateProduct,
//   deleteProduct,
} from '../controller/productController.js';

const router = express.Router();

router.post('/create', createNewProduct);
// router.get('/', getAllProducts);
// router.get('/:id', getProductById);
// router.put('/:id', updateProduct);
// router.delete('/:id', deleteProduct);

export default router;