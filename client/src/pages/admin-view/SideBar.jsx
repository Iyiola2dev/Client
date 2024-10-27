import React from "react";
import { IoAnalyticsSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

import { FaFirstOrderAlt } from "react-icons/fa6";
import { LuLayoutDashboard } from "react-icons/lu";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const adminSideBarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icons: <LuLayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icons: <MdOutlineProductionQuantityLimits />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icons: <FaFirstOrderAlt />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  return (
    <nav className="mt-8 flex flex-col gap-2 ">
      {adminSideBarMenuItems.map((menuItem) => (
        <div
          key={menuItem.id}
          onClick={() => {
            navigate(menuItem.path);
            //Close the sidebar when a menu item is clicked
            setOpen ? setOpen(false) : null;
          }}
          className="flex items-center gap-2 rounded-md px-3 py-2 text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer text-xl"
        >
          {menuItem.icons}
          <span>{menuItem.label}</span>
        </div>
      ))}
    </nav>
  );
}

//The open And setOpen props are passed from the AdminLayout component
const AdminSideBar = ({ open, setOpen }) => {
  const navigate = useNavigate();
  return (
    <>
      {/* The sheet component is from shacdn */}
      {/*  Sidebar Sheet Component for Admin Panel Layout
// This component renders a sidebar that appears on the left side of the screen when open.
// It uses the `Sheet` component, with `SheetContent` defining the sidebar area and a width of 64 (tailwind: `w-64`).
// Inside, `SheetHeader` includes a title section with an icon and "Admin Panel" text.
// The `MenuItems` component is rendered below the header to display navigation options. */}
      <div className=" lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetContent side="left" className="w-64">
            <div className="flex flex-col h-full ">
              <SheetHeader className="border-b">
                <SheetTitle className="flex  gap-2 my-5 ">
                  <IoAnalyticsSharp size={30} />
                  <span> Admin Panel</span>
                </SheetTitle>
              </SheetHeader>
              <MenuItems setOpen={setOpen} />
            </div>
          </SheetContent>
        </Sheet>
      </div>

      <aside className="hidden w-64 flex-col border-r bg-background p-6 lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className=" flex cursor-pointer items-center gap-2 "
        >
          <IoAnalyticsSharp className="text-xl font-extrabold" />
          <h1 className="text-2xl font-extrabold">Admin Panel</h1>
        </div>
        <div>
          <MenuItems />
        </div>
      </aside>
    </>
  );
};

export default AdminSideBar;
