import React from "react";
import { Navigate, useLocation } from "react-router-dom";

//This is still a dummy work in progress
const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  console.log(location.pathname, isAuthenticated);
  //This is when the user is not authenticated and is not on the login or register page he get a redirection back to the login page
  // Redirect unauthenticated users to login, except on login/register pages
  // if (
  //   !isAuthenticated &&
  //   !location.pathname.includes("/login") &&
  //   !location.pathname.includes("/register")
  // ) {
  //   return <Navigate to="/auth/login" />;
  // }

  if (
    !isAuthenticated &&
    !["/auth/login", "/auth/register"].includes(location.pathname) // Use exact path matching
  ) {
    return <Navigate to="/auth/login" />;
  }

  //This is when the user is authenticated but must have a role of admin to access the admin page and if it just a user it will be redirected to the shopping page
  // if (
  //   (isAuthenticated && location.pathname.includes("/login")) ||
  //   location.pathname.includes("/register")
  // ) {
  //  if(user?.role === 'admin'){
  //    return <Navigate to="/admin/dashboard" />;
  //  }else{
  //   return <Navigate to="/shop/home"/>
  //  }
  // }

  if (isAuthenticated) {
    if (
      location.pathname === "/auth/login" ||
      location.pathname === "/auth/register"
    ) {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } else {
        return <Navigate to="/shop/home" />;
      }
    }
  }

  //This is too check if the user is not Admin and is trying to access the admin page
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    // return <Navigate to="/shop/home"/>
    return <Navigate to="/unauth-page" />;
  }
  //This is to check the user is an admi user and trying to access the shopping page
  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }
  return <div>{children}</div>;
};

export default CheckAuth;
