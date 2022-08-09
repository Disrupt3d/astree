import axios from "axios";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError } from "../services/Toastify";
import "react-toastify/dist/ReactToastify.css";
import ExportContextUser from "../contexts/UserContext";
import ConnexionSwitch from "./ConnexionSwitch";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { handleUser } = useContext(ExportContextUser.UserContext);
  const onSubmit = () => {
    if (!email || !password) {
      notifyError("Veuillez remplir tous les champs");
      return;
    }
    axios
      .post(
        `${import.meta.env.VITE_BACKEND_URL}/login`,
        { email, password },
        { withCredentials: true }
      )
      .then((res) => {
        handleUser(res.data);
        notifySuccess("Connexion réussie");
        setTimeout(() => {
          navigate("/observations");
        }, 1500);
      })
      .catch(() => notifyError("L'email ou le mot de passe est incorrect"));
  };

  return (
    <div className="flex flex-col items-center justify-center w-10/12  ">
      <div className=" flex flex-col bg-primary items-center  p-10 rounded-xl shadow-xl  ">
        <ConnexionSwitch isMember={false} linkto="/" />
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <div className=" flex flex-col bg-primary ">
          <h1 className="text-secondary p-5 text-center">Se connecter</h1>
          <p className=" flex text-third text-center  justify-center items-center font-semibold  m-auto mb-5 ">
            Welcome Back !<br /> Hâte de découvrir vos nouvelles observations !
          </p>

          <div className="flex flex-col  ">
            <form
              className="flex flex-col basis-1/2 items-start w-full "
              onSubmit={() => navigate("/observations", { replace: true })}
            >
              <label className="text-lg mt-3 text-left w-full" htmlFor="mail">
                <input
                  className="border rounded-md text-sm font-bold py-1 px-2 w-full bg-third"
                  type="text"
                  name="mail"
                  placeholder="Votre email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
              <label
                className="text-lg mt-3 text-left w-full"
                htmlFor="password"
              >
                <input
                  className="border rounded-md text-sm font-bold py-1 px-2 w-full bg-third"
                  type="password"
                  name="password"
                  placeholder="votre mot de passe"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </label>
              <input
                className="my-6 w-2/3 self-center bg-secondary cursor-pointer text-white font-semibold py-1 rounded-md hover:scale-110 hover:text-third shadow-lg"
                type="button"
                value="Se connecter"
                onClick={onSubmit}
              />
            </form>
            <p className="text-xs text-center text-third mb-8 text-emerald-700 font-bold underline">
              Mot de passe oublié ?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
