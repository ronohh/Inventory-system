import express from 'express';
import { getProducts,addProduct, updateProduct , deleteProduct } from '../controllers/productController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();


router.get('/', authMiddleware, getProducts);
router.post('/add', authMiddleware, addProduct);
router.put('/:id', authMiddleware, updateProduct);
router.delete('/:id', authMiddleware, deleteProduct)

export default router;