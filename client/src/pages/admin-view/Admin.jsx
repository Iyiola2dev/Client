import { Navigate, Route, Routes } from "react-router-dom";

import AdminLayout from "./Layout.jsx";
import AdminDashboard from "./Dashboard.jsx";
import AdminProducts from "./Products.jsx";
import AdminOrder from "./admin-view2/AdminOrderView.jsx";
import AdminFeatures from "./Features.jsx";

import TherapistEdit from "./therapycreation/TherapistEdit.jsx";
import TherapistCreate from "./therapycreation/TherapistCreate.jsx";
import Therapists from "./therapycreation/Therapists.jsx";
import TherapistCreation from "./therapycreation/TherapistView.jsx";
import MultiImageUploader from "./therapycreation/Multiple.jsx";

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

           <Route path="/edit" element={<Therapists />} />
            <Route path="/edit/:id" element={<TherapistCreation />} />
            <Route path="/editTherapist/:id" element={<TherapistEdit />} />
            <Route path="/add-therapist/" element={<TherapistCreate />} />
            <Route path="/multiple" element={<MultiImageUploader />} />

        </Routes>
      </AdminLayout>
    </div>
  );
};

export default Admin;
