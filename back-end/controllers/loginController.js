import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validación básica
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Email y contraseña son requeridos'
            });
        }

        // Buscar usuario
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        // Comparar contraseñas
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: 'Credenciales inválidas'
            });
        }

        // Generar JWT
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        // Configurar cookie
        res.cookie("access_token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 3600000, // 1 hora
            domain: 'localhost' // 👈 Especificar dominio para desarrollo
        });

        res.status(200).json({
            success: true,
            message: 'Login exitoso',
            user: { id: user._id, nombre: user.nombre, email: user.email, isAdmin: user.isAdmin }
        });

    } catch (error) {
        console.error('Error en login:', error); // 👈 Para depuración
        res.status(500).json({
            success: false,
            message: 'Error interno del servidor'
        });
    }
};

// Cerrar sesion
export const logout = (req, res) => {
    res.clearCookie('access_token');
    res.status(200).json({ success: true, message: 'Sesión cerrada' });
};