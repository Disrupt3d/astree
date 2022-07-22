/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError } from "../services/Toastify";
import "react-toastify/dist/ReactToastify.css";

import ConnexionSwitch from "./ConnexionSwitch";
import ExportContextUser from "../contexts/UserContext";

function Signin() {
  const navigate = useNavigate();
  const { handleUser } = useContext(ExportContextUser.UserContext);
  const [createEmail, setEmail] = useState();
  const [createPassword, setPassword] = useState();

  const onSubmit = () => {
    if (!createEmail || !createPassword) {
      notifyError("Des données sont manquantes");
      return;
    }
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/signin`, {
        email: createEmail,
        password: createPassword,
      })
      .then((res) => {
        handleUser(res.data);
        notifySuccess("Connexion réussie, redirection en cours");
        setTimeout(() => {
          navigate("/observations");
        }, 1500);
      })
      .catch(() => {
        notifyError("Echec lors de l'enregistrement");
      });
  };

  return (
    <div className="">
      <div className=" flex flex-col bg-primary p-10 rounded-xl shadow-xl mr-5 w-10/12 ">
        <ConnexionSwitch isMember linkto="/login" />
        <ToastContainer />
        <h1 className="text-secondary p-5 text-center">Créer mon compte</h1>

        <form
          className="w-full flex flex-col items-center"
          onSubmit={() => navigate("/observations", { replace: true })}
        >
          <div className=" ml-2 flex items-center justify-center mb-5">
            <label className="text-lg " htmlFor="mail">
              Email *
              <input
                className="ml-2 border rounded-md text-sm py-1 px-2"
                type="text"
                name="mail"
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>
          </div>

          <div className=" flex ml-5 items-center justify-center mb-5">
            <label className="text-lg " htmlFor="password">
              Mot de passe *
            </label>
            <input
              className="ml-2 border rounded-md text-sm py-1 px-2 w-full"
              type="password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <input
            className="my-6 w-2/3 self-center bg-secondary hover:bg-yellow-200 cursor-pointer text-white font-semibold py-1 rounded"
            type="button"
            value="Créer mon compte"
            onClick={onSubmit}
          />
        </form>
        <ConnexionSwitch isMember linkto="/login" />
      </div>
    </div>
  );
}

export default Signin;
