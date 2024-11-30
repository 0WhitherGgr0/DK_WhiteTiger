import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [role, setRole] = useState(localStorage.getItem('role'));

    const login = (userRole) => {
        localStorage.setItem('role', userRole);
        console.log('User role set in context:', userRole);
        setRole(userRole); 
    };

    const logout = () => {
        localStorage.removeItem('role');
        setRole(null);
    };

    const isAuthenticated = () => !!role;

    return (
        <AuthContext.Provider value={{ role, login, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

