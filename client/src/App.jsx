import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth from "./auth/Auth";
import Admin from "./pages/admin-view/Admin";
import Shopping from "./pages/shopping-view/Shopping";
import NotFound from "./pages/not-found";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";

const App = () => {
  const isAuthenticated = true;
  const user = {
    role: "user",
  };
  return (
    <div className="flex flex-col overflow-hidden bg-red-500">
      {/* This is the main route for the application */}
      <Routes>
        {/* I will be wrapper the check auth for each of the page */}
        <Route path="/*" element={<Dashboard />} />
        <Route
          path="/auth/*"
          element={
            <CheckAuth> <Auth /></CheckAuth>
             
           
          }
        />
        <Route
          path="/admin/*"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Admin />
            </CheckAuth>
          }
        />
        <Route
          path="/shop/*"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Shopping />
            </CheckAuth>
          }
        />

        {/* this is to handle other routes */}
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
};

export default App;
