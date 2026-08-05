import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js';
import { getData } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/', getData);

export default router;