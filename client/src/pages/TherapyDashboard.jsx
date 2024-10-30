// TherapyDashboard.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./landing-page/TherapyLandingPage";
import Therapy from "./therapy/Therapy";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/TherapyNavbar";
import ProtectedRoute from "@/auth/ProtectedRoute";
import TherapistDetails from './therapy/TherapistDetails';


const Dashboard = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="mt-[3rem] lg:mt-[10rem]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/appointment"
            element={
              <ProtectedRoute>
                {/* Render components if authenticated */}
                <Therapy />
              </ProtectedRoute>
            }
          />
          <Route
            path="/therapist/:id"
            element={
              <ProtectedRoute>
                <TherapistDetails />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Dashboard;
