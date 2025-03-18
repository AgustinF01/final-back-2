import express from 'express';
import passport from 'passport';
import { register } from '../controllers/authController.js';
import { checkAvailability } from '../controllers/authController.js';

const router = express.Router();

router.post('/registro', register);
router.get('/check-availability', checkAvailability);
router.get("/check-auth", (req, res) => {
    passport.authenticate("jwt", { session: false }, (err, user) => {
        if (err || !user) {
            return res.status(200).json({ user: null });
        }
        res.status(200).json({
            user: {
                id: user._id,
                nombre: user.nombre,
                email: user.email,
                isAdmin: user.isAdmin,
            },
        });
    })(req, res);
});

// Generar token de recuperación
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: "Usuario no encontrado" });

        // Generar token único (expira en 1h)
        const token = crypto.randomBytes(32).toString('hex');
        user.resetPasswordToken = token;
        user.resetPasswordExpires = Date.now() + 3600000; // 1 hora
        await user.save();

        // Enviar email (usando Nodemailer)
        const transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${token}`;

        await transporter.sendMail({
            to: user.email,
            subject: "Recuperación de Contraseña",
            html: `<p>Haz clic <a href="${resetUrl}">aquí</a> para restablecer tu contraseña (válido por 1 hora).</p>`
        });

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: "Error al procesar la solicitud" });
    }
});

// Restablecer contraseña
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
        });

        if (!user) return res.status(400).json({ error: "Token inválido o expirado" });

        // Verificar si es la misma contraseña anterior
        const isSamePassword = await bcrypt.compare(password, user.password);
        if (isSamePassword) {
            return res.status(400).json({ error: "No puedes usar la misma contraseña" });
        }

        user.password = password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpires = undefined;
        await user.save();

        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ error: "Error al actualizar la contraseña" });
    }
});

export default router;