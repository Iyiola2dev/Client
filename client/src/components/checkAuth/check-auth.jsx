import React from "react";
import { Navigate, useLocation } from "react-router-dom";

//This is still a dummy work in progress
const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();
  //This is when the user is not authenticated and is not on the login or register page he get a redirection back to the login page
  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    return <Navigate to="/auth/login" />;
  }

  //This is when the user is authenticated and is on the login or register page he get a redirection to the home page
  if (
    (isAuthenticated && location.pathname.includes("/login")) ||
    location.pathname.includes("/register")
  ) {
   if(user?.role === 'admin'){
     return <Navigate to="/admin/dashboard" />;
   }else{
    return <Navigate to="/shop/home"/>
   }
  }
  //This is too check if the user is not Admin and is trying to access the admin page
  if(isAuthenticated && user?.role !== "admin" && location.pathname.includes("/admin")){
    // return <Navigate to="/shop/home"/>
    return <Navigate to ="/unauth-page"/>
  }
  //This is to check the user is an admi user and trying to access the shopping page
  if(isAuthenticated && user?.role === 'admin' && location.pathname.includes("/shop")){
    return <Navigate to="/admin/dashboard"/>
  }
  return (
    <div>
      {children}
    </div>
  );
};

export default CheckAuth;
