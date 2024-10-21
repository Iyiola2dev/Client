import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./LandingPage";
import Navbar from "@/components/Navbar";

const Dashboard = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route />
        <Route />
      </Routes>
    </div>
  );
};

export default Dashboard;
