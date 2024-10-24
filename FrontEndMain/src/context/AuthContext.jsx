// src/context/AuthContext.jsx
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        token: localStorage.getItem('token'),
        role: localStorage.getItem('role')
    });

    const login = (token, role) => {
        localStorage.setItem('token', token);
        localStorage.setItem('role', role);
        console.log('User set in context:', { token, role });

        setUser({ token, role }); // Actualiza el estado con el token y el rol
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        setUser(null);
    };

    const isAuthenticated = () => !!user.token;
    const getRole = () => user.role;

    return (
        <AuthContext.Provider value={{ user, login, logout, isAuthenticated, getRole }}>
            {children}
        </AuthContext.Provider>
    );
};
