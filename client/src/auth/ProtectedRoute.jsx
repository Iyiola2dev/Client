import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {
    // Save the intended route in localStorage
    localStorage.setItem("intendedRoute", window.location.pathname);
    return <Navigate to="/auth/login" replace />;
  }

  return children; // Render the child components if authenticated
};

export default ProtectedRoute;
