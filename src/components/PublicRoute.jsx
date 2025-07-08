import {useContext} from "react";
import {Navigate} from "react-router";
import {AuthContext} from "../context/AuthContext.jsx";

export default function PublicRoute({ children }) {
    const { auth } = useContext(AuthContext);
    const isAuthenticated = auth.token && auth.uuid;

    return isAuthenticated ? <Navigate to={`/dashboard`} replace /> : children;
}