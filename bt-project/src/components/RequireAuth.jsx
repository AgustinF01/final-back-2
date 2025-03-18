// src/components/RequireAuth.jsx
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children, adminOnly = false }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/iniciar-sesion" replace />;
    }

    if (adminOnly && !user.isAdmin) {
        return <Navigate to="/" replace />; // Redirige a home si no es admin
    }

    return children;
};

export default RequireAuth;