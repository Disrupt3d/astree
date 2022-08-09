/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import axios from "axios";
import { BiMessageAdd } from "react-icons/bi";

import Cards from "../components/Cards";
import SelectFilter from "../components/SelectFilter";
import ExportContextUser from "../contexts/UserContext";

function Observations() {
  const [searchValue, setSearchValue] = useState("");
  const [filterObservation, setFilterObservation] = useState("2");

  const [observation, setObservation] = useState([]);
  const { user } = useContext(ExportContextUser.UserContext);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/observation`)
      .then((res) => setObservation(res.data));
  }, [observation]);

  return (
    <div id="observations" className="flex flex-col w-full">
      <ToastContainer />
      <div
        className=" flex flex-col w-full  items-center  justify-around bg-transparent"
        id="filterinput"
      >
        <div className="flex justify-center w-10/12 items-center m-auto mt-5 mb-5">
          <h2 className=" flex text-xl text-secondary font-bold">
            Les dernières observations postées
          </h2>
        </div>

        <div className="flex w-full justify-around items-center mb-5 ">
          <input
            className="border rounded-lg text-sm py-1 px-2 w-1/5 m-5 font-bold"
            type="text"
            placeholder="rechercher par mot-clé !"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
          <SelectFilter
            setFilterObservation={setFilterObservation}
            filterObservation={filterObservation}
          />
          <div>
            <Link to="/observations/ajouter" className="nav-items">
              <BiMessageAdd className=" flex text-secondary font-bold text-4xl cursor-pointer hover:scale-105" />
            </Link>
          </div>
        </div>
      </div>
      {filterObservation === "2" ? (
        <div className="flex flex-wrap justify-evenly w-full ">
          {observation &&
            observation
              .filter((el) => el.title.toLowerCase().includes(searchValue))
              .map((el, index) => (
                <Cards el={el} setObservation={setObservation} key={index} />
              ))}
        </div>
      ) : (
        <div className="flex flex-wrap justify-evenly w-full ">
          {observation &&
            observation
              .filter((el) => el.user_id === user.id)
              .filter((el) => el.title.toLowerCase().includes(searchValue))
              .map((el, index) => (
                <Cards el={el} setObservation={setObservation} key={index} />
              ))}
        </div>
      )}
    </div>
  );
}

export default Observations;
