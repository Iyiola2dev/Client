import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./landing-page/LandingPage";
import Navbar from "@/components/navbar/Navbar";
import Therapy from "./therapy/Therapy";
import Footer from "@/components/footer/Footer";

const Dashboard = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/appointment" element={<Therapy />} />
        <Route />
      </Routes>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
