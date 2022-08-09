/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prefer-destructuring */
import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Form } from "react-bootstrap";

import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError } from "../services/Toastify";
import "react-toastify/dist/ReactToastify.css";
import ExportContextUser from "../contexts/UserContext";

function Profile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const { refresh, setRefresh } = useContext(ExportContextUser.UserContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/profile/${id}`)
      .then((res) => setProfile(res.data));
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setProfile({
      ...profile,
      [e.target.name]: value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/profile/${id}`, profile)
      .then((res) => {
        setProfile(res.data);
        notifySuccess("Votre profil a bien été modifié, retour vers le flux");
        setTimeout(() => {
          navigate("/observations");
        }, 2500);
      })
      .catch(() => notifyError("Une erreur est survenue, veuillez réessayer"));
  };

  return (
    <div className=" flex flex-col items-center " id="profilepage">
      <ToastContainer />
      <div className="flex flex-col items-center justify-center m-10  pt-10 pb-10 bg-primary shadow-xl opacity-90 rounded-3xl ">
        <div className="bg-primary flex ">
          <div className=" flex  flex-col items-center w-1/3 h-full justify-around">
            {profile && profile.pseudo && (
              <h2 className=" flex justify-between text-4xl text-secondary  text-center font-bold">
                Bienvenue, {profile.pseudo}
              </h2>
            )}

            {profile && profile.image_url ? (
              <img
                className=" flex items-center justify-center m-5 w-1/3 rounded-lg"
                src={profile.image_url}
                alt={profile.image_alt}
              />
            ) : (
              ""
            )}
            <div className="flex flex-col w-1/2 items-center justify-between pb-3">
              <label className=" flex items-center justify-around text-third font-extrabold  p-3">
                Lien HTML de votre photo:
              </label>
              <p className=" text-third pb-5 text-center text-sm ">
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
                className=" font-bold rounded-sm w-full pl-2 pr-2"
                type="html"
                name="image_url"
                onChange={(e) => handleChange(e)}
                defaultValue={profile && profile.image_url}
              />
            </div>
          </div>

          <div className=" flex flex-col  w-2/3 justify-around ml-5 mr-5 ">
            <h4 className=" text-md text-third text-left p-3 mb-5">
              Vous pouvez effectuer sur cette page, toutes les modifications
              souhaitées, à l&apos;exception de votre addresse Email.
            </h4>
            <form
              id="updateform"
              className=" flex  flex-col items-center justify-center  "
            >
              <div className="flex w-full items-center justify-between pt-3 pb-3">
                <label
                  htmlFor="pseudo"
                  className="  items-center justify-around text-third font-extrabold  w-1/4"
                >
                  Pseudo:
                </label>
                <input
                  className=" text-center shadow-xl w-3/4 "
                  type="text"
                  name="pseudo"
                  onChange={(e) => handleChange(e)}
                  defaultValue={profile && profile.pseudo}
                />
              </div>
              <div className="flex items-center w-full   pt-3 pb-3">
                <label
                  htmlFor="sexe"
                  className="  text-third font-extrabold  w-1/4"
                >
                  Sexe:
                </label>
                <select
                  className=" text-center font-semibold text-primary shadow-xl w-1/4 bg-third rounded-sm  "
                  type="text"
                  name="sexe"
                  onChange={(e) => handleChange(e)}
                  value={profile && profile.sexe}
                >
                  <option className="font-semibold text-primary" value="">
                    choisir un sexe
                  </option>
                  <option className="font-semibold text-primary" value="Homme">
                    Homme
                  </option>
                  <option className="font-semibold text-primary" value="Femme">
                    Femme
                  </option>
                </select>
              </div>
              <div className="flex w-full items-center  pt-3 pb-3">
                <label
                  htmlFor="age"
                  className="  items-center justify-around text-third font-extrabold   w-1/4"
                >
                  Age:
                </label>
                <input
                  className=" text-center shadow-xl w-1/4 "
                  type="text"
                  name="age"
                  onChange={(e) => handleChange(e)}
                  defaultValue={profile && profile.age}
                />
              </div>
              <div className="flex w-full items-center   pt-3 pb-3">
                <label
                  htmlFor="city"
                  className="  items-center justify-around text-third font-extrabold w-1/4"
                >
                  Ville:
                </label>
                <input
                  className=" text-center shadow-xl w-2/4 "
                  type="text"
                  name="city"
                  onChange={(e) => handleChange(e)}
                  defaultValue={profile && profile.city}
                />
              </div>
              <div className="flex w-full items-center justify-between  pt-3 pb-3">
                <label
                  htmlFor="camera"
                  className="  items-center justify-around text-third font-extrabold w-1/4"
                >
                  Appareil de capture:
                </label>
                <input
                  className=" text-center shadow-xl w-3/4 "
                  type="text"
                  name="camera"
                  onChange={(e) => handleChange(e)}
                  defaultValue={profile && profile.camera}
                />
              </div>
              <div className="flex w-full items-center justify-between  pt-3 pb-3">
                <label
                  className="  items-center justify-around text-third font-extrabold w-1/4 "
                  htmlFor="telescope"
                >
                  Mon télescope:
                </label>
                <input
                  className=" text-center shadow-xl w-3/4"
                  type="text"
                  name="telescope"
                  onChange={(e) => handleChange(e)}
                  defaultValue={profile && profile.telescope}
                />
              </div>
              <div className="flex w-full items-center justify-between  pt-3 pb-3">
                <label
                  className="  items-center justify-around text-third font-extrabold w-1/4 "
                  htmlFor="monture"
                >
                  Ma Monture:
                </label>
                <input
                  className=" text-center shadow-xl w-3/4"
                  type="text"
                  name="monture"
                  onChange={(e) => handleChange(e)}
                  defaultValue={profile && profile.monture}
                />
              </div>
              <div className="flex w-full items-center justify-between  pt-3 pb-3">
                <label
                  className=" flex items-center justify-between text-third font-extrabold   w-1/4 "
                  htmlFor="biography"
                >
                  Biographie:
                </label>
                <Form.Control
                  className="w-3/4"
                  as="textarea"
                  rows={8}
                  name="biography"
                  onChange={(e) => handleChange(e)}
                  defaultValue={profile && profile.biography}
                />
              </div>

              <div className="flex w-full items-center justify-evenly ">
                <button
                  className="my-6 w-40 self-center bg-secondary cursor-pointer text-white font-semibold py-1 rounded hover:scale-110 hover:text-primary shadow-lg"
                  type="submit"
                  onClick={(e) => {
                    submit(e);
                    setRefresh(!refresh);
                  }}
                >
                  Sauvegarder
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
