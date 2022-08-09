/* eslint-disable react/prop-types */
import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";
import Modal from "./Modal";
import nopic from "../assets/no_pic_profile.png";

import ExportContextUser from "../contexts/UserContext";

function Cards({ el, setObservation, observation }) {
  const { user } = useContext(ExportContextUser.UserContext);
  const [more, setMore] = useState(false);
  const handleMore = () => {
    setMore(!more);
  };
  return (
    <Card
      style={{ width: "35rem" }}
      id="observationcards"
      key={el.title}
      className="card  m-3 mb-5 rounded-2xl shadow-lg shadow-primary  "
    >
      <div className="card-header-title is-centered flex rounded-t-xl text-3xl font-bold text-center py-3  bg-primary  shadow-xl text-secondary ">
        <div className="flex w-11/12 justify-center">{el.title}</div>
        <div className="flex w-1/12 justify-center">
          {user.id === el.user_id ? (
            <button type="button" id="more" onClick={() => setMore(!more)}>
              ...
            </button>
          ) : (
            ""
          )}
        </div>
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
        <div className="media flex items-center justify-between p-2 ">
          <Link to={`/profile/consulter/${el.user_id}`}>
            {el && el.image_url ? (
              <div
                id="cardprofilepicture"
                className="bg-secondary hover:scale-125  rounded-full "
                style={{
                  backgroundImage: `url(${el.image_url})`,
                }}
              />
            ) : (
              <div
                id="cardprofilepicture"
                className="media-left  bg-secondary  rounded-full"
                style={{
                  backgroundImage: `url(${nopic})`,
                }}
              />
            )}
          </Link>

          <div className="media-content">
            <p className=" text-right">
              Posté par
              <span className="  p-2 font-bold text-secondary">
                {el.pseudo}
              </span>
            </p>
          </div>
        </div>

        <h3 className="  pl-4 mt-3 mb-3 text-primary border-b-2 border-secondary/25 ">
          Informations de capture
        </h3>
        <div className="flex justify-between p-2 m-2 shadow-sm rounded-md ">
          <div className="content flex flex-col  text-sm text-center  ">
            <div className="flex items-center mb-1">
              <p className="text-left font-bold text-secondary ">Date:</p>
              <span className="ml-1 font-regular">{el.date}</span>
            </div>
            <div className="flex items-center mb-1">
              <p className="text-left font-bold text-secondary ">
                Localisation:
              </p>
              <span className="ml-1 font-regular">{el.city_location}</span>
            </div>
          </div>

          <div className="content flex flex-col  text-sm text-center ">
            <div className="flex items-center mb-1">
              <p className="text-left font-bold text-secondary ">Tube:</p>
              <span className="ml-1 font-regular">{el.telescope}</span>
            </div>
            <div className="flex items-center mb-1">
              <p className="text-left font-bold text-secondary ">
                Appareil photo:
              </p>
              <span className="ml-1 font-regular">{el.camera}</span>
            </div>
          </div>
        </div>
        <div className="content text-sm text-left text-ellipsis flex-wrap  rounded-md   mb-0 mt-5">
          <h3 className="  pl-4 mt-3 mb-3 text-primary border-b-2 border-secondary/25 ">
            Description du cliché
          </h3>
          <p className="pt-1 pb-3 mt-1 mb-3 pl-3 pr-3 shadow-sm rounded-md h-full">
            {el.description}
          </p>
        </div>
      </div>
    </Card>
  );
}

export default Cards;
