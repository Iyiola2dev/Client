
// This component is a button that will navigate the user to the appointment page if they are authenticated. If they are not authenticated, it will save the intended route and navigate the user to the login page.

import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setIntendedRoute } from "@/store/auth-slice";


const AppointmentButton = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleBookingClick = () => {
    if (isAuthenticated) {
      navigate("/appointment");
    } else {
      dispatch(setIntendedRoute("/appointment")); // Save the intended route
      navigate("/auth/login");
    }
  };

  return (
    <button
      className="rounded-full bg-white border-2 text-black mt-2"
      onClick={handleBookingClick}
    >
      Book Appointment
    </button>
  );
};

export default AppointmentButton;
