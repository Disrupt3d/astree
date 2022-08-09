import React, { useContext } from "react";

import { Link } from "react-router-dom";
import Logo from "../assets/Astree-logo.png";
import UserAccount from "./UserAccount";
import ExportContextUser from "../contexts/UserContext";

function Navbar() {
  const { user } = useContext(ExportContextUser.UserContext);
  return (
    <div className=" bg-primary">
      <nav className="navbar  flex items-center ">
        <div className="logo-wrapper">
          <img src={Logo} alt="Logo" width="150px" />
        </div>

        <div
          className=" flex w-3/4  items-center justify-around "
          id="menu-wrapper"
        >
          <Link to="/observations" className="nav-items">
            Observations
          </Link>

          <Link to="/evenements" className="nav-items">
            Evenements
          </Link>
        </div>
        <div className="flex bg-primary w-1/4  justify-center ">
          <UserAccount className="flex mr-5" />
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
