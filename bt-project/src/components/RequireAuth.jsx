// src/components/RequireAuth.jsx
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const { user } = useAuth();

    if (!user) {
        return <Navigate to="/" />;
    }

    return children;
};

export default RequireAuth;