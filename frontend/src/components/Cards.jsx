/* eslint-disable react/prop-types */
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import Modal from "./Modal";

import ExportContextUser from "../contexts/UserContext";

function Cards({ el, setObservation, observation }) {
  const { user } = useContext(ExportContextUser.UserContext);
  const [more, setMore] = useState(false);
  const handleMore = () => {
    setMore(!more);
  };
  return (
    <div
      id="observationcards"
      key={el.title}
      className="card w-2/5 m-3 mb-5 mt-5 rounded-none shadow-xl rounded-t-xl "
    >
      <div className="card-header-title is-centered text-center text-3xl  bg-primary  shadow-xl text-secondary  rounded-t-lg">
        {el.title}
        {user.id === el.profile_id ? (
          <button type="button" id="more" onClick={() => setMore(!more)}>
            ...
          </button>
        ) : (
          ""
        )}
        {more === true && (
          <Modal
            el={el}
            setObservation={setObservation}
            observation={observation}
            handleMore={handleMore}
          />
        )}
      </div>

      <div className="card-image  rounded-md ">
        <img
          className=" shadow-md m-auto w-full "
          id="picture"
          src={el.photo_url}
          alt={el.photo_alt}
        />
      </div>
      <div className="card-content w-full p-0   ">
        <div className="media items-center justify-center mt-3 mb-2 rounded-md pl-4 pr-4">
          <Link to={`/profile/consulter/${el.profile_id}`}>
            <div
              id="cardprofilepicture"
              className="media-left  bg-secondary  rounded-full hover:scale-125 cursor-pointer "
              style={{
                backgroundImage: `url(${el.image_url})`,
              }}
            />
          </Link>
          <div className="media-content">
            <p className="title is-6 text-right">
              Posté par
              <span className="  p-2 text-bold text-secondary">
                {el.pseudo}
              </span>
            </p>
          </div>
        </div>

        <p className=" text-sm font-bold pl-4 mt-5 mb-3 ">
          Informations de capture
        </p>
        <div className="flex justify-between p-2 m-2 shadow-sm rounded-md ">
          <div className="content flex flex-col  text-sm text-center  ">
            <p className="text-left ">Date: {el.date}</p>
            <p className="text-left "> Caméra : {el.city_location}</p>
          </div>

          <div className="content flex flex-col  text-sm text-center ">
            <p className="text-left "> Tube : {el.telescope}</p>
            <p className="text-left "> Caméra : {el.camera}</p>
          </div>
        </div>
        <div className="content text-sm text-left text-ellipsis flex-wrap  rounded-md   mb-0 mt-5">
          <p className="font-bold pl-4 mt-3 mb-3">Description du cliché</p>
          <p className="pt-1 mt-1 mb-5 pl-3 pr-3 shadow-sm rounded-md">
            {el.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cards;
