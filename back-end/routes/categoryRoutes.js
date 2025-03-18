// back-end/routes/categoryRoutes.js
import express from 'express';
import { getCategories } from '../controllers/categoryController.js';

const router = express.Router();
router.get('/', getCategories); // GET /api/categories

export default router; // 👈 Asegurar que el router se exporte