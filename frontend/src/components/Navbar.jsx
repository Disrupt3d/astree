import React, { useContext } from "react";

import { Link } from "react-router-dom";
import Logo from "../assets/Astree-logo.png";
import UserAccount from "./UserAccount";
import ExportContextUser from "../contexts/UserContext";

function Navbar() {
  const { user } = useContext(ExportContextUser.UserContext);
  return (
    <div className="">
      <nav className="navbar  ">
        <div className="logo-wrapper">
          <img src={Logo} alt="Logo" width="120px" />
        </div>

        <div
          className="flex justify-evenly items-center w-full"
          id="menu-wrapper"
        >
          <Link to="/observations" className="nav-items">
            Observations
          </Link>
          <Link to="/observations/ajouter" className="nav-items">
            Ajouter
          </Link>
          <Link to="/evenements" className="nav-items">
            Evenements
          </Link>
          <Link to={`/profile/${user.id}`} className="nav-items">
            <UserAccount />
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
