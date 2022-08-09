import React from "react";
import logo from "../assets/Astree-logo.png";

function LoginLeft() {
  return (
    <div
      className="flex flex-wrap flex-col h-screen bg-primary w-2/3 justify-around opacity-95 "
      id="loginleft"
    >
      <div className="flex justify-center items-center" id="logowrapper">
        <img src={logo} alt="" width="300px" />
      </div>

      <div className=" flex justify-center p-5 " id="logintext1">
        <h1 className=" flex  text-secondary text-2xl text-center ">
          Rejoignez une communauté de passionnés et partagez sans plus attendre
          les plus beaux clichés de vos observations.
        </h1>
      </div>
      <div className=" flex justify-center p-5 " id="logintext2">
        <h1 className=" flex  text-secondary text-2xl text-center rounded-2xl ">
          Organisez ou prenez part à des soirées d&apos;observation du ciel près
          de chez vous et rencontrez d&apos;autres amateurs passionés
          d&apos;astrophotographie.
        </h1>
      </div>
    </div>
  );
}

export default LoginLeft;
