import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const isLoading = useSelector((state) => state.auth.isLoading);

  // Wait until the auth state is loaded
  if (isLoading) return null; // or a loading spinner

  // Redirect to login if not authenticated and not on a public route
  const publicRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/forgot-password",
  ];
  const currentRoute = window.location.pathname;

  if (isAuthenticated === false && !publicRoutes.includes(currentRoute)) {
    localStorage.setItem("lastAttemptedURL", currentRoute);
    return <Navigate to="/auth/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
