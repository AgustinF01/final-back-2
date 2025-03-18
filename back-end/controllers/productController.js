// back-end/controllers/productController.js
import Product from '../models/product.model.js';
import mongoose from 'mongoose';
import validator from 'validator';

// Obtener todos los productos
export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({}).populate('categoria', 'name'); // 👈 Poblar categorías
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: 'Error del servidor' });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate('categoria', 'name');
        if (!product) {
            return res.status(404).json({ success: false, message: "Producto no encontrado" });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al obtener el producto" });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { nombre, descripcion, precio, categoria, imagen, tipo, talles, cantidades } = req.body;

        // Validación adicional
        if (req.body.tipo === '') {
            if (!req.body.talles || !req.body.cantidades) {
                return res.status(400).json({
                    success: false,
                    message: 'Talles y cantidades son requeridos para productos de ropa'
                });
            }

            if (req.body.talles.length !== req.body.cantidades.length) {
                return res.status(400).json({
                    success: false,
                    message: 'Cada talle debe tener su cantidad correspondiente'
                });
            }
        }

        // Validación detallada de campos
        const missingFields = [];
        if (!nombre) missingFields.push("nombre");
        if (!descripcion) missingFields.push("descripción");
        if (!precio) missingFields.push("precio");
        if (!categoria) missingFields.push("categoría");
        if (!imagen) missingFields.push("imagen");
        if (!tipo) missingFields.push("tipo");

        if (missingFields.length > 0) {
            return res.status(400).json({
                success: false,
                message: `Faltan campos obligatorios: ${missingFields.join(", ")}`
            });
        }

        if (!nombre || !descripcion || !precio || !categoria || !imagen || !tipo) {
            return res.status(400).json({
                success: false,
                message: "Todos los campos son obligatorios"
            });
        }

        // Validar URL de imagen
        if (!validator.isURL(imagen)) {
            return res.status(400).json({
                success: false,
                message: "La imagen debe ser una URL válida"
            });
        }

        // Crear nuevo producto
        const newProduct = await Product.create({
            nombre,
            descripcion,
            precio,
            categoria,
            imagen,
            tipo,
            talles: tipo === 'ropa' ? talles : [], // Solo si es ropa
            cantidades: tipo === 'ropa' ? cantidades.map(Number) : [] // Convertir a números
        });

        res.status(201).json({
            success: true,
            message: 'Producto creado con éxito',
            product: newProduct
        });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({
            success: false,
            message: error.message || 'Error interno del servidor'
        });
    }
};

// Editar producto
export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, precio, categoria, imagen, tipo } = req.body;

        // Validar ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
                success: false,
                message: "ID de producto inválido"
            });
        }

        // Validar campos requeridos
        if (!nombre || !descripcion || !precio || !categoria || !imagen || !tipo) {
            return res.status(400).json({
                success: false,
                message: "Todos los campos son obligatorios"
            });
        }

        // Validar URL de imagen
        if (!imagen.startsWith("http://") && !imagen.startsWith("https://")) {
            return res.status(400).json({
                success: false,
                message: "La imagen debe ser una URL válida (http/https)"
            });
        }

        // Buscar y actualizar producto
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { nombre, descripcion, precio, categoria, imagen, tipo },
            { new: true, runValidators: true } // 👈 Activa validaciones de Mongoose
        );

        if (!updatedProduct) {
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            });
        }

        res.status(200).json({ success: true, product: updatedProduct });

    } catch (error) {
        console.error("Error en updateProduct:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error al actualizar producto"
        });
    }
};

// Eliminar producto
export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ success: false, message: "ID inválido" });
        }

        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Producto no encontrado" });
        }

        res.status(200).json({ success: true, message: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Error al eliminar producto" });
    }
};