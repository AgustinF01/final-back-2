import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import cookieParser from 'cookie-parser';
import loginRoutes from './routes/loginRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import productRoutes from './routes/productRoutes.js'; // 👈 Nueva importación
import categoryRoutes from './routes/categoryRoutes.js'; // 👈 Nueva importación
import path from 'path';
import cartRoutes from './routes/cartRoutes.js'; // 👈 Añade esta línea
import checkoutRoutes from './routes/checkoutRoutes.js';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { container } from './config/container.js';


dotenv.config();

const app = express();
const { productService } = container;

app.get('/api/test', async (req, res) => {
    const products = await productService.getAllProducts();
    res.json(products);
});

// Middleware
const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'], // Headers permitidos
    exposedHeaders: ['Authorization'], // Headers expuestos al frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // 👈 Métodos permitidos
};
const __dirname = path.resolve();
app.use(cookieParser());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(cors(corsOptions));
app.use(express.json());


// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/auth', loginRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/checkout', checkoutRoutes);
app.post('/api/comprobante', async (req, res) => {
    try {
        const order = req.body.order;
        // Generar comprobante de pago
        const comprobante = await generateComprobante(order);

        res.json({ comprobante });
    } catch (error) {
        // Manejar error de comprobante
    }
});
app.post('/api/payment', async (req, res) => {
    try {
        const paymentData = req.body;
        // Procesar transacción de pago
        const paymentResponse = await processPayment(paymentData);

        if (paymentResponse.success) {
            // Generar comprobante de pago
            const comprobante = await generateComprobante(paymentResponse.order);

            res.json({ comprobante });
        } else {
            // Manejar error de pago
        }
    } catch (error) {
        // Manejar error de pago
    }
});


// Conexión a DB
connectDB();

// // Ruta de prueba
// app.get('/', (req, res) => {
//     res.send('API funcionando');
// });

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Servidor en puerto ${PORT}`);
});