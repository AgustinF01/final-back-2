import express from 'express';
import { body, validationResult } from 'express-validator';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';
import { uploadProductImages } from '../middleware/uploadMiddleware.js';

const router = express.Router();

router.route('/')
    .get(getProducts) // GET /api/products
    .post(protect, isAdmin, createProduct); // POST /api/products

router.route('/:id')
    .get(getProductById) // 👈 Nueva ruta GET
    .put(protect, isAdmin, updateProduct)
    .delete(protect, isAdmin, deleteProduct);



router.post(
    '/',
    isAdmin,
    [
        body('nombre').notEmpty().withMessage('El nombre es obligatorio'),
        body('descripcion').notEmpty().withMessage('La descripción es obligatoria'),
        body('precio').isFloat({ min: 0 }).withMessage('Precio inválido'),
        body('categoria').isMongoId().withMessage('Categoría inválida'),
        body('imagen').isURL().withMessage('URL de imagen inválida')
    ],
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                errors: errors.array().map(e => e.msg)
            });
        }
        next();
    },
    createProduct
);

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', protect, isAdmin, createProduct);
router.put('/:id', protect, isAdmin, updateProduct);
router.delete('/:id', protect, isAdmin, deleteProduct);


export default router;