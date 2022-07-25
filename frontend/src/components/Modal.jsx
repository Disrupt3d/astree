/* eslint-disable react/prop-types */
import React from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError } from "../services/Toastify";
import "react-toastify/dist/ReactToastify.css";
import trash from "../assets/trash.png";
import edit from "../assets/editing.png";

function Modal({ el, handleMore }) {
  const handleDelete = () => {
    axios
      .delete(`${import.meta.env.VITE_BACKEND_URL}/observation/${el.photo_id}`)
      .then(() => {
        handleMore();
        notifySuccess("Votre post a bien été supprimé ! ");
      })

      .catch(() => notifyError("Supression impossible"));
  };
  return (
    <div
      className="w-32 h-32 bg-primary  flex items-center justify-around rounded-lg"
      id="modal"
    >
      <button type="button" onClick={() => handleDelete()}>
        <img src={trash} alt="" />
      </button>
      <Link to={`/observations/modifier/${el.photo_id}`}>
        <button type="button">
          <img src={edit} alt="" />
        </button>
      </Link>
    </div>
  );
}

export default Modal;
