

// This component is a button that will navigate the user to the teen appointment page if they are authenticated. If they are not authenticated, it will save the intended route and navigate the user to the login page.

import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// import { setIntendedRoute } from "@/store/auth-slice";


const TeenButton = ({ text }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBookingClick = () => {
    if (isAuthenticated) {
      navigate("/therapy/appointment/teen"); // Navigate directly to the appointment page
    } else {
      localStorage.setItem("intendedRoute", "/therapy"); // Save the intended route
      navigate("/auth/login"); // Redirect to the login page
    }
  };


  return (
    <button
      className="relative rounded-full bg-white text-black mt-2 py-1 px-6 lg:px-4 font-semibold text-center overflow-hidden"
      style={{
        border: "2px solid transparent",
        backgroundImage:
          "linear-gradient(white, white), linear-gradient(to right, pink, blue, pink, blue, pink, blue)",
        backgroundClip: "padding-box, border-box",
        borderImage:
          "linear-gradient(to right, pink, blue, pink, blue, pink, blue) 1",
      }}
      onClick={handleBookingClick}
    >
      {text}
    </button>
  );
};

export default TeenButton;
