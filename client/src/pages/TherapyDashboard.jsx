
import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./landing-page/TherapyLandingPage";
import Therapy from "./therapy/Therapy";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/TherapyNavbar";

const Dashboard = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="mt-[5rem] lg:mt-[8rem]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/appointment" element={<Therapy />} />
          <Route />
        </Routes>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
