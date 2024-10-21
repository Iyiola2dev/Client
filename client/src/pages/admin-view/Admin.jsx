import { Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "./Layout";
import AdminDashboard from "./Dashboard";
import AdminProducts from "./Products";
import AdminOrder from "./Order";
import AdminFeatures from "./Features";

const Admin = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/AdminLayout" />} />
        <Route path="/AdminLayout" element={<AdminLayout />} />
        <Route path="/dashboard" element={<AdminDashboard/>}/>
        <Route path="/product" element={<AdminProducts/>}/>
        <Route path="/orders" element={<AdminOrder/>}/>
        <Route path="/features" element={<AdminFeatures/>}/>
        <Route/>
      </Routes>
    </div>
  );
};

export default Admin;
