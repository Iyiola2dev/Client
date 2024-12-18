import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

  // Save the last attempted URL if the user is not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem("lastAttemptedURL", location.pathname);
    }
  }, [isAuthenticated, location.pathname]);

  // Redirection Logic
  if (!isAuthenticated) {
    // Allow access to login and register pages
    if (
      [
        "/auth/login",
        "/auth/register",
        "/auth/forgot-password",
        "/auth/input-otp",
        "/auth/reset-password",
        "/auth/confirm-reset",
      ].includes(location.pathname)
    ) {
      return children;
    }
    // Redirect unauthenticated users to login
    return <Navigate to="/auth/login" />;
  }

  if (isAuthenticated) {
    // Prevent authenticated users from accessing auth pages
    if (
      ["/auth/login", "/auth/register", "/auth/forgot-password"].includes(
        location.pathname
      )
    ) {
      const lastAttemptedURL = localStorage.getItem("lastAttemptedURL");

      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to={lastAttemptedURL || "/therapy"} replace />;
      }
    }

    // Redirect non-admin users away from admin pages
    if (user?.role !== "admin" && location.pathname.includes("/admin")) {
      return <Navigate to="/unauth-page" />;
    }

    // Redirect admin users away from non-admin pages
    if (user?.role === "admin" && location.pathname.includes("/appointment")) {
      return <Navigate to="/admin/dashboard" />;
    }
  }

  // Render children if no redirects are triggered
  return <div>{children}</div>;
};

export default CheckAuth;
