import { Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "./Layout";
import AdminDashboard from "./Dashboard";
import AdminProducts from "./Products";
import AdminOrder from "./Order";
import AdminFeatures from "./Features";

const Admin = () => {
  return (
    <div>
      <AdminLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/admin/dashboard" />} />
          <Route path="/dashboard" element={<AdminDashboard />} />
          <Route path="/products" element={<AdminProducts />} />
          <Route path="/orders" element={<AdminOrder />} />
          <Route path="/features" element={<AdminFeatures />} />
        </Routes>
      </AdminLayout>
    </div>
  );
};

export default Admin;
