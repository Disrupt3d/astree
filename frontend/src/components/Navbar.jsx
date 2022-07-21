import React from "react";

import { Link } from "react-router-dom";
import Logo from "../assets/Astree-logo.png";

function Navbar() {
  return (
    <div>
      <nav className="navbar flex">
        <div className="logo-wrapper">
          <img src={Logo} alt="Logo" width="150px" />
        </div>

        <div
          className="flex justify-evenly items-center w-full"
          id="menu-wrapper"
        >
          <Link to="/observations" className="nav-items">
            Observations
          </Link>
          <Link to="/observations/add" className="nav-items">
            Ajouter
          </Link>
          <Link to="/evenements" className="nav-items">
            Evenements
          </Link>
          <Link to="/profil" className="nav-items">
            Profil
          </Link>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
