// TherapyDashboard.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import LandingPage from "./landing-page/TherapyLandingPage";
import Therapy from "./therapy/Therapy";
import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/TherapyNavbar";
import ProtectedRoute from "@/auth/ProtectedRoute";
import TherapistDetails from "./therapy/TherapistDetails";
import TherapistInfo from "./therapy/Test";
import TeenPage from "./therapy/teen/TeenPage";
import TherapistCreation from "./admin-view/TherapistCreation";

const TherapyDashboard = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-[3rem] lg:mt-[10rem] md:mt-[5rem]">
        <Routes>
          {/* Public Route for Therapy Landing Page */}
          <Route path="/" element={<LandingPage />} />

          {/* Protected Therapy Routes */}
          <Route
            path="/appointment"
            element={
              <ProtectedRoute>
                <Therapy />
              </ProtectedRoute>
            }
          />
          <Route
            path="/appointment/teen"
            element={
              <ProtectedRoute>
                <TeenPage />
              </ProtectedRoute>
            }
          />
          <Route path="/therapist-details/:id" element={<TherapistDetails />} />
          <Route path="/testpage" element={<TherapistInfo />} />
          <Route path="/upload" element={<TherapistCreation />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default TherapyDashboard;
