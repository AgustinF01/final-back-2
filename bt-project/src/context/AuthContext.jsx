// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthChecked, setIsAuthChecked] = useState(false); // 👈 Nuevo estado

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const { data } = await axios.get(
                    "http://localhost:5000/api/auth/check-auth",
                    { withCredentials: true } // 👈 ¡Crítico! Envía la cookie
                );

                if (data.user) {
                    setUser(data.user);
                    localStorage.setItem("user", JSON.stringify(data.user));
                }
            } catch (error) {
                localStorage.removeItem("user");
                setUser(null);
            } finally {
                setIsAuthChecked(true);
            }
        };

        checkAuth();
    }, []);

    // Recuperar datos del usuario al recargar
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const login = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
    };

    const logout = async () => {
        try {
            await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
        setUser(null);
        localStorage.removeItem('user');
    };

    return (
        <AuthContext.Provider value={{ user, isAuthChecked, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);