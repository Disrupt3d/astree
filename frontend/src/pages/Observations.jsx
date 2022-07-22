import React, { useState, useContext, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";

import ExportContextUser from "../contexts/UserContext";

function Observations() {
  const [searchValue, setSearchValue] = useState("");

  const [observation, setObservation] = useState([]);
  const { user } = useContext(ExportContextUser.UserContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/observation`)
      .then((res) => setObservation(res.data));
  }, []);

  return (
    <div id="observations" className="flex flex-col">
      <div className="bg-transparent" id="filterinput">
        <input
          className="border rounded-xl text-sm py-1 px-2 w-1/5 m-5"
          type="text"
          placeholder="rechercher par mot-clé !"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <div className="flex flex-wrap m-5 justify-evenly">
        {observation &&
          observation
            .filter(
              (el) =>
                el.title.toLowerCase().includes(searchValue) ||
                el.description.toLowerCase().includes(searchValue)
            )
            .map((el) => (
              <div
                id="observationcards"
                key={el.title}
                className="card w-1/3 pl-5 pr-5 pt-5 m-5 rounded-xl shadow-xl  flex-wrap "
              >
                <div className="card-header-title is-centered text-center title is-4 bg-primary rounded-sm  shadow-xl text-secondary">
                  {el.title}
                </div>

                <div className="card-image rounded-lg flex items-center justify-center ">
                  <img className="" src={el.photo_url} alt={el.photo_alt} />
                </div>
                <div className="card-content w-full   ">
                  <div className="media items-center justify-center  mt-3">
                    <div
                      id="cardprofilepicture"
                      className="media-left  bg-secondary  rounded-full hover:scale-125 cursor-pointer "
                      style={{
                        backgroundImage: `url(${el.image_url})`,
                      }}
                    />
                    <div className="media-content">
                      <p className="title is-6 text-right">
                        Posté par
                        <span className=" text-bold text-secondary">
                          {" "}
                          {el.pseudo}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="content  text-sm text-center   shadow-md p-2  rounded-lg">
                    {el.description}

                    <div className="content flex flex-col  text-sm text-center ">
                      <time className="m-3">
                        Photo prise le :
                        <span className="font-bold"> {el.date} </span> à :{" "}
                        <span className="font-bold"> {el.city_location}</span>
                      </time>{" "}
                    </div>
                  </div>
                  {user.id === el.profile_id ? (
                    <footer className=" flex items-center justify-end pt-5  ">
                      <NavLink to={`/observations/modifier/${el.photo_id}`}>
                        <button
                          type="submit"
                          className="button is-info hover:scale-105 shadow-lg"
                        >
                          Editer
                        </button>
                      </NavLink>
                    </footer>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Observations;
