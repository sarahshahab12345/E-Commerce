import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminHeader from "./admin-header";
import AdminSidebar from "./admin-sidebar";

function AdminLayout() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar open={open} setOpen={setOpen}/>
      <div className="flex flex-1 flex-col">
        <AdminHeader open={open} setOpen={setOpen} />
        <main className="flex-1 flex-col flex bg-muted/40 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
