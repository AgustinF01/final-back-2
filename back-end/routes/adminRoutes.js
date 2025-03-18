// back-end/routes/adminRoutes.js
import express from "express";
import { createProduct } from "../controllers/productController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/create-product",
    protect, // Middleware de autenticación
    isAdmin, // Middleware de autorización
    createProduct
);

export default router;