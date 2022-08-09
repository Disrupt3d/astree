/* eslint-disable react/prop-types */
import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { notifySuccess, notifyError } from "../services/Toastify";
import "react-toastify/dist/ReactToastify.css";

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
      className="  bg-primary  flex flex-col w-28 flex-wrap items-center justify-evenly rounded-md shadow-md"
      id="modal"
    >
      <button
        type="button"
        onClick={() => handleDelete()}
        className="w-[35px] flex"
      >
        <MdDeleteForever className=" hover:scale-125" id="delete" />
      </button>
      <Link to={`/observations/modifier/${el.photo_id}`}>
        <button
          type="button"
          className="w-[30px] flex hover:scale-125"
          id="update"
        >
          <FaEdit className="w-[27px]" />
        </button>
      </Link>
    </div>
  );
}

export default Modal;
