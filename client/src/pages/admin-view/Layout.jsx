import React, { useState } from "react";

import AdminSideBar from "./SideBar";
import AdminHeader from "./Header";

const AdminLayout = ({ children }) => {
  //this is the admin dashboard sidebar
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSideBar open={openSidebar} setOpen={setOpenSidebar} />

      {/* Main content area */}
      <div className="flex flex-col flex-grow">
        {/* Header */}
        <AdminHeader setOpen={setOpenSidebar} />

        {/* Dynamic content */}
        <main className="flex-grow p-4 overflow-auto">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
