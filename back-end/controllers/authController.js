import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

export const register = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        // Validar campos
        if (!nombre || !email || !password) {
            return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
        }

        // Verificar si el usuario ya existe
        const existingUser = await User.findOne({
            $or: [{ email }, { nombre }]
        });

        if (existingUser) {
            let message = '';
            if (existingUser.email === email) message = 'El email ya está registrado';
            if (existingUser.nombre === nombre) message = 'El nombre ya está en uso';
            return res.status(400).json({ success: false, message });
        }

        // Crear nuevo usuario
        const newUser = await User.create({
            nombre,
            email,
            password
        });

        // Generar JWT
        const token = jwt.sign(
            { id: newUser._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            success: true,
            token,
            user: {
                id: newUser._id,
                nombre: newUser.nombre,
                email: newUser.email
            }
        });
    } catch (error) {
        console.error('Error en el registro:', error);

        if (error.name === "ValidationError") {
            const messages = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({
                success: false,
                message: messages.join(', ')
            });
        }

        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

export const checkAvailability = async (req, res) => {
    try {
        const { email, nombre } = req.query;
        const query = {};

        if (email) query.email = email;
        if (nombre) query.nombre = nombre;

        const existingUser = await User.findOne(query);
        res.status(200).json({ exists: !!existingUser });
    } catch (error) {
        res.status(500).json({ error: 'Error verificando disponibilidad' });
    }
};

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false // Añadir para desarrollo
    }
});