// src/routes/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children, allowedRoles }) => {
    const { isAuthenticated, role } = useAuth();

    if (!isAuthenticated()) {
        return <Navigate to="/login" />;
    }

    if (allowedRoles && !allowedRoles.includes(role)) {
        alert('No tienes permisos para acceder a esta ruta');
        return <Navigate to="/dashboard" />; // Redirige si el rol no es permitido
    }

    return children;
};

export default PrivateRoute;
