

import React, { useContext } from "react";
import { Authcontext } from "../context/Authcontext";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const { token } = useContext(Authcontext);
    if (!token) {
        return <Navigate to="/login" />;
    }
    return children;
};


export default ProtectedRoute;