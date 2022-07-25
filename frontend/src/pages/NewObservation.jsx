/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prefer-destructuring */
import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Form } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError } from "../services/Toastify";
import "react-toastify/dist/ReactToastify.css";
import ExportContextUser from "../contexts/UserContext";

function NewObservation() {
  const { user } = useContext(ExportContextUser.UserContext);
  const [newobservation, setNewobservation] = useState("null");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const value = e.target.value;
    setNewobservation({
      ...newobservation,
      [e.target.name]: value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/observation/`, {
        ...newobservation,
        profile_id: user.id,
      })
      .then((res) => {
        setNewobservation(res.data);
        notifySuccess(
          "Votre post a bien été créé, retour vers l'ensemble des posts"
        );
        setTimeout(() => {
          navigate("/observations");
        }, 1500);
      })
      .catch(() => notifyError("Une erreur est survenue, veuillez réessayer"));
  };

  return (
    <div id="newobservation" className="flex flex-col items-center   ">
      <h2 className="m-5 flex justify-center items-center text-4xl text-secondary font-bold">
        Ajouter une Observation Astrale
      </h2>
      <div className=" flex flex-col w-6/12 items-center bg-primary rounded-xl  m-5 shadow-xl opacity-90">
        <ToastContainer />
        {newobservation && newobservation.photo_url ? (
          <img
            className=" flex items-center justify-center m-5 w-3/4 rounded-sm "
            src={newobservation.photo_url}
            alt={newobservation.photo_alt}
          />
        ) : (
          ""
        )}
        ;
        <div className="w-full">
          <form
            id="updateform"
            className=" flex flex-wrap flex-col items-center justify-center "
          >
            <label className=" flex items-center justify-around text-third font-extrabold w-full p-3 ">
              Titre de l&apos;observation
            </label>
            <input
              className="w-11/12 text-center shadow-xl"
              type="text"
              name="title"
              onChange={(e) => handleChange(e)}
            />

            <label className=" flex items-center justify-around text-third font-extrabold w-full p-3">
              Date d&apos;observation:
            </label>
            <input
              className="w-15 text-center"
              type="text"
              name="date"
              onChange={(e) => handleChange(e)}
              placeholder="format jj/MM/AAAA"
            />
            <div className="flex w-full items-center justify-between p-5">
              <label className=" flex items-center justify-around text-third font-extrabold w-2/8 p-3">
                Département d`&apos;`observation:
              </label>
              <input
                className="w-1/6"
                type="text"
                name="dpt_location"
                onChange={(e) => handleChange(e)}
                placeholder="ex: 75"
              />

              <label className=" flex items-center justify-around text-third font-extrabold w-2/8 p-3">
                Ville d&apos;observation:
              </label>
              <input
                className="w-2/6"
                type="text"
                name="city_location"
                onChange={(e) => handleChange(e)}
                placeholder="ex: Paris"
              />
            </div>

            <label className=" flex items-center justify-around text-third font-extrabold w-full p-3">
              Description et matériel utilisé:
            </label>
            <Form.Control
              className="w-11/12"
              as="textarea"
              rows={3}
              name="description"
              onChange={(e) => handleChange(e)}
              placeholder="dîtes nous en plus sur l'exposition, le filtrage, le traitement de l'image , l'outil de capture"
            />

            <label className=" flex items-center justify-around text-third font-extrabold w-full p-3">
              Lien HTML de votre photo:
            </label>
            <p className=" text-third pb-5 text-center">
              Afin de pouvoir changer la photo, veuillez au préalable
              l&apos;uploader sur un hébergeur d&apos;image comme{" "}
              <a
                className="text-secondary font-extrabold"
                href="https://fr.imgbb.com/"
              >
                ImgBB
              </a>{" "}
              et copiez-collez l&apos;url html complète ci-dessous:
            </p>
            <input
              className="w-11/12"
              type="html"
              name="photo_url"
              onChange={(e) => handleChange(e)}
              defaultValue={newobservation && newobservation.photo_url}
              placeholder="https://urldevotrephoto.jpg"
            />

            <label className=" flex items-center justify-around text-third font-extrabold w-full p-3">
              Description de l&apos;image:
            </label>
            <input
              className="w-11/12 "
              type="text"
              name="photo_alt"
              onChange={(e) => handleChange(e)}
              placeholder="Parce qu'il faut toujours une légende"
            />

            <div className="flex w-full items-center justify-evenly">
              <button
                className="my-6 w-40 self-center bg-secondary cursor-pointer text-black font-extrabold py-1 rounded hover:scale-125 hover:text-third shadow-lg"
                type="submit"
                onClick={(e) => submit(e)}
              >
                Ajouter
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default NewObservation;
