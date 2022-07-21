import { Outlet } from "react-router-dom";

import React from "react";

import LoginLeft from "../components/LoginLeft";

function ConnexionLayout() {
  return (
    <div id="loginpage" className="flex w-full justify-between items-center  ">
      <LoginLeft />
      <Outlet />
    </div>
  );
}
export default ConnexionLayout;
