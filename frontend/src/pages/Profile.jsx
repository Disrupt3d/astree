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
      <div className="flex flex-col items-center justify-center m-10 bg-primary shadow-xl opacity-90 rounded-3xl ">
        <div className="bg-primary flex items-center m-5  ">
          <div className=" flex  flex-col items-center justify-center w-full">
            {profile && profile.pseudo ? (
              <h2 className=" m-auto text-4xl text-secondary  text-center font-bold">
                Bienvenue, {profile.pseudo}
              </h2>
            ) : (
              <h2 className="  text-4xl text-secondary text-center  font-bold">
                bienvenue utilisateur inconnu
              </h2>
            )}
            {profile && profile.image_url ? (
              <img
                className=" flex items-center justify-center m-5 w-11/12 rounded-lg"
                src={profile.image_url}
                alt={profile.image_alt}
              />
            ) : (
              ""
            )}
          </div>

          <div className="ml-5 mr-5 ">
            <h4 className=" text-lg text-third text-center p-3 mb-5">
              Vous pouvez effectuer sur cette page, toutes les modifications à
              l&apos;exception de votre pseudo et de votre addresse Email.
            </h4>
            <form
              id="updateform"
              className=" flex  flex-col items-center justify-center  "
            >
              <div className="flex w-full items-center justify-between pb-3">
                <label className="  items-center justify-around text-third font-extrabold  p-3 w-1/4">
                  Ville:
                </label>
                <input
                  className=" text-center shadow-xl w-3/4 "
                  type="text"
                  name="city"
                  onChange={(e) => handleChange(e)}
                  defaultValue={profile && profile.city}
                />
              </div>
              <div className="flex w-full items-center justify-between pb-3">
                <label className="  items-center justify-around text-third font-extrabold  p-3 w-2/4">
                  Mon appareil de capture:
                </label>
                <input
                  className=" text-center shadow-xl w-2/4 "
                  type="text"
                  name="camera"
                  onChange={(e) => handleChange(e)}
                  defaultValue={profile && profile.camera}
                />
              </div>
              <div className="flex w-full items-center justify-between pb-3">
                <label className="  items-center justify-around text-third font-extrabold  p-3 w-2/4 ">
                  Mon télescope:
                </label>
                <input
                  className=" text-center shadow-xl w-2/4"
                  type="text"
                  name="telescope"
                  onChange={(e) => handleChange(e)}
                  defaultValue={profile && profile.telescope}
                />
              </div>
              <div className="flex w-full items-center justify-between pb-3">
                <label className=" flex items-center justify-around text-third font-extrabold  p-3 w-1/4 ">
                  Biographie:
                </label>
                <Form.Control
                  className="w-3/4 pb-3"
                  as="textarea"
                  rows={4}
                  name="biography"
                  onChange={(e) => handleChange(e)}
                  defaultValue={profile && profile.biography}
                />
              </div>
              <div className="flex flex-col w-full items-center justify-between pb-3">
                <label className=" flex items-center justify-around text-third font-extrabold  p-3">
                  Lien HTML de votre photo:
                </label>
                <p className=" text-third pb-5 text-center ">
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
                  className="w-full bg-secondary"
                  type="html"
                  name="image_url"
                  onChange={(e) => handleChange(e)}
                  defaultValue={profile && profile.image_url}
                />
              </div>

              <div className="flex w-full items-center justify-evenly pb-5">
                <button
                  className="my-6 w-40 self-center bg-secondary cursor-pointer text-white font-semibold py-1 rounded hover:scale-125 hover:text-primary shadow-lg"
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
