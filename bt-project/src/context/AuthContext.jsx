// Importar dependencias
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Crear contexto de autenticación
const AuthContext = createContext();

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
    // Estado para almacenar el usuario autenticado
    const [user, setUser] = useState(null);

    // Estado para almacenar si la autenticación ha sido verificada
    const [isAuthChecked, setIsAuthChecked] = useState(false);

    // Utilizar el hook useNavigate para redirigir a otras rutas
    const navigate = useNavigate();

    // Verificar la autenticación al montar el componente
    useEffect(() => {
        const checkAuth = async () => {
            try {
                // Realizar una solicitud GET a la ruta de autenticación
                const { data } = await axios.get(
                    "http://localhost:5000/api/auth/check-auth",
                    { withCredentials: true }
                );

                // Si el usuario está autenticado, actualizar el estado
                if (data.user) {
                    setUser(data.user);
                    localStorage.setItem("user", JSON.stringify(data.user));
                }
            } catch (error) {
                // Si ocurre un error, eliminar el usuario del almacenamiento local
                localStorage.removeItem("user");
                setUser(null);
            } finally {
                // Indicar que la autenticación ha sido verificada
                setIsAuthChecked(true);
            }
        };

        // Llamar a la función de verificación de autenticación
        checkAuth();
    }, []);

    // Recuperar datos del usuario al recargar
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    // Función para iniciar sesión
    const login = (userData) => {
        // Actualizar el estado del usuario
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));

        // Redirigir a la ruta de inicio si es administrador
        if (userData.isAdmin) {
            navigate('/dashboard');
        } else {
            navigate('/');
        }
    };

    // Función para cerrar sesión
    const logout = async () => {
        try {
            // Realizar una solicitud POST a la ruta de cierre de sesión
            await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }

        // Eliminar el usuario del estado y del almacenamiento local
        setUser(null);
        localStorage.removeItem('user');
    };

    // Proporcionar el contexto de autenticación a los componentes hijos
    return (
        <AuthContext.Provider value={{ user, isAuthChecked, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

// Hook para utilizar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);