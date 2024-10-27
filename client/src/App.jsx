// App.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth from "./auth/Auth";
import Admin from "./pages/admin-view/Admin";
import Shopping from "./pages/shopping-view/Shopping";
import NotFound from "./pages/not-found";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import TherapyDashboard from "./pages/TherapyDashboard";

const App = () => {
  const isAuthenticated = false; // Replace with your actual authentication state
  const user = null; // Replace with your actual user state

  return (
    <div className="flex flex-col overflow-hidden ">
      {/* This is the main route for the application */}
      <Routes>
        {/* Main Dashboard Route */}
        <Route path="/*" element={<Dashboard />} />

        {/* Authentication Route */}
        <Route path="/auth/*" element={<Auth />} />

        {/* Admin Route */}
        <Route
          path="/admin/*"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Admin />
            </CheckAuth>
          }
        />

        {/* Shopping Route */}
        <Route
          path="/shop/*"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Shopping />
            </CheckAuth>
          }
        />

        {/* Therapy Route */}
        <Route
          path="/therapy/*"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <TherapyDashboard /> {/* Render Therapy Dashboard Component */}
            </CheckAuth>
          }
        />

        {/* Unauthenticated Access Route */}
        <Route path="/unauth-page" element={<UnauthPage />} />

        {/* Handle Other Routes */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
