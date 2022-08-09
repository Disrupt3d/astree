/* eslint-disable react/prop-types */
import React from "react";
import { NavLink } from "react-router-dom";

function ConnexionSwitch({ isMember, align, linkto }) {
  return (
    <div className={`flex text-sm font-bold ${align}`}>
      <h2 className="text-third">
        {isMember ? "Déjà membre ?" : "Pas encore de compte ?"}
      </h2>
      <NavLink to={linkto}>
        <button
          type="button"
          className="text-sm px-2 font-bold text-secondary underline hover:text-third"
        >
          {isMember ? "Se connecter" : "Créer un compte"}
        </button>
      </NavLink>
    </div>
  );
}

export default ConnexionSwitch;
