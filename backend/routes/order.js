import express from 'express';
import authmiddleware from '../middleware/authMiddleware.js'
import {addOrder, getOrders} from '../controllers/orderController.js';

const router = express.Router();

router.post('/add', authmiddleware, addOrder );
router.get("/",authmiddleware, getOrders);

export default router;