import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./landing-page/LandingPage";
import Navbar from "@/components/navbar/Navbar";

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
