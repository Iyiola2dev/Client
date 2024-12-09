import React, { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";

//This is still a dummy work in progress
const CheckAuth = ({ isAuthenticated, user, children }) => {
  const location = useLocation();

 

  if (
    !isAuthenticated &&
    !["/auth/login", "/auth/register"].includes(location.pathname) // Use exact path matching
  ) {
    return <Navigate to="/auth/login" />;
  }

  useEffect(()=>{
    if(!isAuthenticated){
      // Save the last route
      localStorage.setItem("lastAttemptedUrl", location.pathname);
    }
  }, [isAuthenticated, location.pathname])

  if (isAuthenticated) {
    if (
      location.pathname === "/auth/login" ||
      location.pathname === "/auth/register"
    ) {
      const lastAttemptedURL = localStorage.getItem("lastAttemptedURL");
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;

      } else {
        return <Navigate to={lastAttemptedURL ||"/therapy"  } replace/>;
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
    location.pathname.includes("/therapy" )
  ) {
    return <Navigate to="/admin/dashboard" />;
  }
  return <div>{children}</div>;
};

export default CheckAuth;
