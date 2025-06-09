import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState({
        token: localStorage.getItem('token') || null,
        uuid: localStorage.getItem('uuid') || null
    });

    const login = (token, uuid) => {
        localStorage.setItem('token', token);
        localStorage.setItem('uuid', uuid);
        setAuth({ token, uuid });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('uuid');
        setAuth({ token: null, uuid: null });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};