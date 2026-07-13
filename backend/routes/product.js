import express from 'express';
import { getProducts,addProduct, updateProduct } from '../controllers/productController.js';

const router = express.Router();


router.get('/', getProducts);
router.post('/add', addProduct);
router.put('/:id', updateProduct);

export default router;