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

export default router;