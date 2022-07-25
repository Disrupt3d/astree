import { Outlet } from "react-router-dom";

import React from "react";
import Navbar from "../components/Navbar";

function UserLoggedLayout() {
  return (
    <div className="flex flex-col w-full h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
}
export default UserLoggedLayout;
