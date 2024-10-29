

import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setIntendedRoute } from '@/store/auth-slice';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  if (!isAuthenticated) {
    // Save the intended route before redirecting
    dispatch(setIntendedRoute(window.location.pathname));
    return <Navigate to="/auth/login" replace />;
  }

  return children; // Render the child components if authenticated
};

export default ProtectedRoute;
