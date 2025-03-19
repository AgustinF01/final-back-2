import { authenticateJWT } from "../config/passport.js";

export const protect = (req, res, next) => {
    authenticateJWT(req, res, (err) => {
        if (err || !req.user) {
            console.error('Error de autenticación:', {
                headers: req.headers,
                cookies: req.cookies,
                error: err?.message
            });
            return res.status(401).json({
                success: false,
                message: "Acceso no autorizado"
            });
        }
        req.userId = req.user._id;
        next();
    });
};

export const isAdmin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(403).json({
            success: false,
            message: "Acceso denegado: Se requiere rol de administrador"
        });
    }
};