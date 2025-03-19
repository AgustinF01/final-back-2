import Cart from '../models/Cart.js';
import mongoose from 'mongoose';


export const getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ user: req.params.userId })
            .populate({
                path: 'items.productId',
                select: 'nombre precio imagen', 
                model: 'Product'
            });

        // Validación adicional
        const validatedItems = cart.items.map(item => {
            return {
                ...item.toObject(),
                productId: {
                    ...item.productId.toObject(),
                    precio: Number(item.productId.precio) || 0 
                }
            }
        });

        res.json(validatedItems);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener el carrito' });
    }
};

// Actualizar carrito
export const updateCart = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { items } = req.body;

        // Validar que el userId coincida con el usuario autenticado
        if (req.user.id !== userId) { 
            return res.status(403).json({
                success: false,
                message: "No autorizado para modificar este carrito"
            });
        }

        // Validar que todos los items tengan productId válido
        if (!items.every(item =>
            mongoose.Types.ObjectId.isValid(item.productId)
        )) {
            return res.status(400).json({
                success: false,
                message: "Formato de productId inválido"
            });
        }

        // Validar items
        if (!items.every(item => item.productId && item.quantity)) {
            return res.status(400).json({
                success: false,
                message: "Cada ítem debe tener productId y quantity"
            });
        }

        // Actualizar o crear el carrito
        const cart = await Cart.findOneAndUpdate(
            { user: userId },
            { items },
            { new: true, upsert: true, runValidators: true }
        ).populate('items.productId', 'nombre precio imagen');

        res.status(200).json({ success: true, items: cart.items });
    } catch (error) {
        console.error("Error en updateCart:", error);
        res.status(500).json({
            success: false,
            message: error.message || "Error interno del servidor"
        });
    }
};