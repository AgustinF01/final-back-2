import passport from "passport";
import { Strategy as JWTStrategy, ExtractJwt } from "passport-jwt";
import User from "../models/user.model.js";

const cookieExtractor = (req) => {
    // Verificar múltiples fuentes del token
    return req.cookies?.access_token ||
        req.headers?.authorization?.split(' ')[1] ||
        null;
};

passport.use(
    new JWTStrategy(
        {
            jwtFromRequest: cookieExtractor, // Usa el extractor de cookies
            secretOrKey: process.env.JWT_SECRET,
        },
        async (payload, done) => {
            try {
                const user = await User.findById(payload.id); // Busca el usuario por el ID del payload
                if (!user) return done(null, false); // Si no existe, retorna false
                return done(null, user); // Si existe, adjunta el usuario a req.user
            } catch (error) {
                return done(error, false);
            }
        }
    )
);

export const authenticateJWT = passport.authenticate("jwt", { session: false });