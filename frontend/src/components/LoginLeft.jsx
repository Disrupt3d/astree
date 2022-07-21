import React from "react";
import logo from "../assets/Astree-logo.png";

function LoginLeft() {
  return (
    <div className="flex flex-wrap flex-col h-screen text-white bg-primary w-1/3 justify-around ">
      <div className="flex items-center justify-evenly">
        <img
          src={logo}
          alt="logo"
          className="mobile:w-40 tablet:w-60 laptop:w-96"
        />
      </div>
      <h1 className="  flex p-5 text-secondary font-medium text-center   mobile:text-sm tablet:text-sm laptop:text-lg desktop:text-xl ">
        Inscrivez-vous et créez sans attendre les souvenirs de vos plus belles
        rencontres Astrales.
      </h1>
      <h1 className=" flex p-5 text-secondary font-medium text-center   mobile:text-sm tablet:text-sm laptop:text-lg desktop:text-xl ">
        Organisez ou prenez part à des soirées d'observation près de chez vous
        et rencontrez d'autres passionés.
      </h1>
    </div>
  );
}

export default LoginLeft;
