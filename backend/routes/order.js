import express from 'express';
import authmiddleware from '../middleware/authMiddleware.js'
import {addOrder} from '../controllers/orderController.js';

const router = express.Router();

router.post('/add', authmiddleware, addOrder );

export default router;