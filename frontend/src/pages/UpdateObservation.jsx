/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable prefer-destructuring */
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";

import { Form } from "react-bootstrap";
import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError } from "../services/Toastify";
import "react-toastify/dist/ReactToastify.css";

function UpdateObservation() {
  const { id } = useParams();
  const [observation, setObservation] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/observation/${id}`)
      .then((res) => setObservation(res.data));
  }, []);

  const handleChange = (e) => {
    const value = e.target.value;
    setObservation({
      ...observation,
      [e.target.name]: value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    axios
      .put(`${import.meta.env.VITE_BACKEND_URL}/observation/${id}`, observation)
      .then((res) => {
        setObservation(res.data);
        notifySuccess("Votre post a bien été modifié, redirection en cours");
        setTimeout(() => {
          navigate("/observations");
        }, 1500);
      })
      .catch(() => notifyError("Une erreur est survenue, veuillez réessayer"));
  };

  return (
    <div id="observations" className="flex flex-col items-center   ">
      <h2 className="m-5 flex justify-center items-center text-4xl text-secondary font-bold">
        Modifier votre Observation
      </h2>
      <div className=" flex flex-col w-6/12 items-center bg-primary rounded-xl  m-5 shadow-xl">
        <ToastContainer />
        {observation && observation.photo_url ? (
          <img
            className=" flex items-center justify-center mt-5   rounded-sm "
            src={observation.photo_url}
            alt={observation.photo_alt}
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
              defaultValue={observation && observation.title}
            />

            <label className=" flex items-center justify-around text-third font-extrabold w-full p-3">
              Date d&apos;observation:
            </label>
            <input
              className="w-15 text-center"
              type="text"
              name="date"
              onChange={(e) => handleChange(e)}
              defaultValue={observation && observation.date}
            />
            <div className="flex w-full items-center justify-between p-5">
              <label className=" flex items-center justify-around text-third font-extrabold w-2/8 p-3">
                Département d&apos;observation:
              </label>
              <input
                className="w-1/6"
                type="text"
                name="dpt_location"
                onChange={(e) => handleChange(e)}
                defaultValue={observation && observation.dpt_location}
              />

              <label className=" flex items-center justify-around text-third font-extrabold w-2/8 p-3">
                Ville d&apos;observation:
              </label>
              <input
                className="w-2/6"
                type="text"
                name="city_location"
                onChange={(e) => handleChange(e)}
                defaultValue={observation && observation.city_location}
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
              defaultValue={observation && observation.description}
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
              defaultValue={observation && observation.photo_url}
            />

            <label className=" flex items-center justify-around text-third font-extrabold w-full p-3">
              Description de l&apos;image:
            </label>
            <input
              className="w-11/12 "
              type="text"
              name="photo_alt"
              onChange={(e) => handleChange(e)}
              defaultValue={observation && observation.photo_alt}
            />

            <div className="flex w-full items-center justify-evenly">
              <button
                id="button"
                className="my-6 w-40 self-center bg-secondary cursor-pointer text-black font-bold py-1 rounded"
                type="submit"
                onClick={(e) => submit(e)}
              >
                Valider
              </button>
              <Link to="/observations">
                <button
                  id="button"
                  className="  my-6 w-40 self-center  cursor-pointer py-1 rounded"
                  type="submit"
                >
                  Annuler
                </button>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateObservation;
