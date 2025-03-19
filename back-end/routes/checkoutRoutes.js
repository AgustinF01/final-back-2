import express from 'express';
import { processOrder, getOrderById } from '../controllers/checkoutController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(protect, processOrder);

router.route('/:id')
    .get(protect, getOrderById);

export default router;