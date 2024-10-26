import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Auth from "./auth/Auth";
import Admin from "./pages/admin-view/Admin";
import Shopping from "./pages/shopping-view/Shopping";
import NotFound from "./pages/not-found";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";

const App = () => {
  //This is coming from the redux store
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    //This is to check if the user is authenticated
    dispatch(checkAuth());
  }, [dispatch]);

  //This is to check if the user is still loading and 
  if (isLoading) {
    return <Skeleton className="max-w-md h-auto rounded-full" />;
  }
  console.log(isLoading, user);

  return (
    <div className="flex flex-col overflow-hidden ">
      {/* This is the main route for the application */}
      <Routes>
        {/* I will be wrapper the check auth for each of the page */}
        <Route path="/*" element={<Dashboard />} />
        <Route
          path="/auth/*"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <Auth />
            </CheckAuth>
            // <Auth />
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
