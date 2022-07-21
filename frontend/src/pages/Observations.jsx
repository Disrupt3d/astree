import React, { useState, useContext, useEffect } from "react";
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
      <div className="bg-transparent">
        <input
          className="border rounded-md text-sm py-1 px-2 w-1/5 m-5"
          type="text"
          placeholder="rechercher par mot-clé !"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      <div className="flex w-screen flex-wrap m-5 justify-evenly">
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
                className="card w-1/3 p-3  m-3 bg-third flex-wrap"
              >
                <div className="card-header-title is-centered text-center title is-4 bg-primary rounded-lg text-secondary">
                  {el.title}
                </div>

                <div className="card-image">
                  <img className=" " src={el.photo_url} alt={el.photo_alt} />
                </div>
                <div className="card-content">
                  <div className="media items-center justify-center">
                    <div
                      id="cardprofilepicture"
                      className="media-left  bg-secondary  rounded-full"
                      style={{
                        backgroundImage: `url(${el.image_url})`,
                      }}
                    />
                    <div className="media-content">
                      <p className="title is-6 text-center">
                        Posté par
                        <span className=" text-bold text-secondary">
                          {" "}
                          {el.pseudo}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="content  text-sm text-center w-full m-1">
                    {el.description} <br />
                    <br />
                    <time className="m-3">
                      Photo prise le :
                      <span className="font-bold">{el.date}</span>
                    </time>{" "}
                    à : <span className="font-bold">{el.city_location}</span>
                  </div>
                  {user.id === el.profile_id ? (
                    <footer className="card-footer justify-evenly m-5">
                      <button type="submit" className="button is-info">
                        Editer
                      </button>
                      <button type="submit" className="button is-danger">
                        Supprimer
                      </button>
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
