import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (!isAuthenticated) {

    // Save the last route
    const currentRoute = window.location.pathname;
    localStorage.setItem("lastAttemptedURL", currentRoute);
  

    return <Navigate to="/auth/login" replace />;
  }

  return children; // Render the child components if authenticated
};

export default ProtectedRoute;
