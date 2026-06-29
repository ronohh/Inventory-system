import express from 'express';
import { addSupplier } from '../controllers/supplierController.js';

const router = express.Router();

router.post('/add', addSupplier);

export default router;