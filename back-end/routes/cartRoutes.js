// back-end/routes/cartRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getCart, updateCart } from '../controllers/cartController.js';

const router = express.Router();

router.route('/:userId')
    .get(protect, getCart)
    .put(protect, updateCart);

export default router;