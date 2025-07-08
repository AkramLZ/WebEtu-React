import React, { createContext, useState } from 'react';
import {getUuid, getToken} from "../services/api.js";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({
        token: getToken() || null,
        uuid: getUuid() || null
    });

    const login = (token, uuid, rememberMe = false) => {
        const storage = rememberMe ? localStorage : sessionStorage;
        storage.setItem('token', token);
        storage.setItem('uuid', uuid);
        setAuth({ token, uuid });
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('uuid');
        sessionStorage.removeItem('uuid');
        sessionStorage.removeItem('uuid');
        setAuth({ token: null, uuid: null });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};