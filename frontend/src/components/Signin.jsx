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
  const [createPseudo, setPseudo] = useState();

  const onSubmit = () => {
    if (!createEmail || !createPassword || !createPseudo) {
      notifyError("Des données sont manquantes");
      return;
    }
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/signin`, {
        email: createEmail,
        password: createPassword,
        pseudo: createPseudo,
      })
      .then((res) => {
        handleUser(res.data);
        notifySuccess("Connexion réussie, Bienvenue!");
        setTimeout(() => {
          navigate("/observations");
        }, 1500);
      })
      .catch(() => {
        notifyError("Echec lors de l'enregistrement");
      });
  };

  return (
    <div className="flex flex-col justify-center items-center w-2/3 m-5">
      <div
        className="  flex flex-col bg-primary items-center w-2/3  py-5 rounded-2xl shadow-xl  "
        id="signinbox"
      >
        <ConnexionSwitch isMember linkto="/login" />
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
        <h1 className="text-secondary p-5 text-center">Créer mon compte</h1>
        <p
          className=" flex text-third text-center font-semibold w-2/3 mb-10 "
          id="signintext"
        >
          Rien de plus facile ! Saisissez votre adresse email, choisissez un
          pseudo et un mot de passe et le tour est joué ! Une fois connecté,
          vous pourrez par la suite compléter votre profil.
        </p>

        <form
          className="w-full flex flex-col justify-around "
          onSubmit={() => navigate("/observations", { replace: true })}
        >
          <div className=" my-4 w-full  flex  justify-center   items-center">
            <label
              className="w-1/6 text-lg font-bold text-third "
              htmlFor="mail"
            >
              Email *
            </label>
            <input
              className=" bg-third rounded-md  font-bold text-primary py-1 px-2 w-2/4"
              type="text"
              name="mail"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className=" my-2 w-full  flex  justify-center   items-center">
            <label
              className="w-1/6 text-lg font-bold text-third  "
              htmlFor="pseudo"
            >
              Pseudo *
            </label>
            <input
              className=" bg-third rounded-md  font-bold text-primary py-1 px-2 w-2/4"
              type="text"
              name="pseudo"
              onChange={(event) => setPseudo(event.target.value)}
            />
          </div>

          <div className="my-2 w-full  flex  justify-center   items-center">
            <label
              className="w-1/6 text-lg font-bold text-third  "
              htmlFor="password"
            >
              Mot de passe *
            </label>
            <input
              className=" bg-third rounded-md  font-bold text-primary py-1 px-2 w-2/4"
              type="password"
              name="password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>

          <input
            className="my-6 w-2/3 self-center bg-secondary hover:text-third cursor-pointer  font-semibold py-1 rounded"
            id="signin-btn"
            type="button"
            value="Créer mon compte"
            onClick={onSubmit}
          />
        </form>
      </div>
    </div>
  );
}

export default Signin;
