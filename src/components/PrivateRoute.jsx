import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';
import { AuthContext } from '../context/AuthContext';

const PrivateRoute = () => {
    const { auth } = useContext(AuthContext);
    return auth.token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;