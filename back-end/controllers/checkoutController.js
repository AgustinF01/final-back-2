// back-end/controllers/checkoutController.js
import mongoose from 'mongoose';
import Order from '../models/Order.model.js';


export const processOrder = async (req, res) => {
    try {
        const { items, shippingAddress, paymentMethod } = req.body;
        const user = req.user.id;

        // Validación básica
        if (!items || items.length === 0) {
            return res.status(400).json({ error: 'El carrito está vacío' });
        }

        // Calcular totales
        const itemsPrice = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
        const taxPrice = itemsPrice * 0.21;
        const totalPrice = itemsPrice + taxPrice;

        // Crear preferencia de pago en MercadoPago
        const preference = {
            items: items.map(item => ({
                title: item.name,
                unit_price: Number(item.price),
                quantity: Number(item.quantity),
            })),
            payer: {
                name: shippingAddress.fullName,
                email: req.user.email,
                address: {
                    zip_code: shippingAddress.zipCode,
                    street_name: shippingAddress.address,
                }
            },
            back_urls: {
                success: `${process.env.FRONTEND_URL}/comprobante`,
                failure: `${process.env.FRONTEND_URL}/checkout/error`,
            },
            auto_return: 'approved',
        };

        // Crear transacción en MercadoPago
        const response = await mercadopago.preferences.create(preference);

        // Guardar orden en la base de datos
        const order = new Order({
            user,
            orderItems: items,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            taxPrice,
            totalPrice,
            paymentResult: {
                id: response.body.id,
                status: 'pending'
            }
        });

        await order.save();

        res.json({
            id: order._id,
            init_point: response.body.init_point,
            sandbox_init_point: response.body.sandbox_init_point
        });

    } catch (error) {
        console.error('Error al procesar el pedido:', error);
        res.status(500).json({
            error: 'Error al procesar el pedido',
            details: error.message
        });
    }
};


export const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('user', 'name email')
            .exec();

        if (!order) {
            return res.status(404).json({ error: 'Orden no encontrada' });
        }

        if (order.user.toString() !== req.user.id && !req.user.isAdmin) {
            return res.status(401).json({ error: 'No autorizado' });
        }

        res.json(order);
    } catch (error) {
        console.error('Error al obtener la orden:', error);
        res.status(500).json({ error: 'Error del servidor' });
    }
};
