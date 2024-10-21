import React from "react";

import AdminSideBar from "./SideBar";
import AdminHeader from "./Header";

const AdminLayout = () => {
  //this is the admin dashboard sidebar
  return (
    <div className="flex min-h-screen w-full">
      {/* admin sidebar */}
      <AdminSideBar />
      <div className="flex flex-1 flex-col">
        {/* admin header */}
        <AdminHeader />
        <div></div>
      </div>
      <div></div>
    </div>
  );
};

export default AdminLayout;
