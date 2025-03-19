import express from "express";
import { createProduct } from "../controllers/productController.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post(
    "/create-product",
    protect, 
    isAdmin, 
    createProduct
);

export default router;