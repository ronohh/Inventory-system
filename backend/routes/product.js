import express from 'express';
import { getProducts,addProducts } from '../controllers/productController.js';

const router = express.Router();


router.get('/', getProducts);
router.post('/add', addProducts);

export default router;