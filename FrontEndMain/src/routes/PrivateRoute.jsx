// src/routes/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, getRole } = useAuth();

    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    const userRole = getRole();

    // Si `allowedRoles` está definido y el rol del usuario no está en la lista, redirige.
    if (allowedRoles && !allowedRoles.includes(userRole)) {
        return <Navigate to="/dashboard" />; // Redirige a una página permitida si no tiene acceso
    }

    return children;
};

export default PrivateRoute;
