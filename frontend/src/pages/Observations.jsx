/* eslint-disable react/no-array-index-key */
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import axios from "axios";
import Cards from "../components/Cards";

function Observations() {
  const [searchValue, setSearchValue] = useState("");

  const [observation, setObservation] = useState([]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/observation`)
      .then((res) => setObservation(res.data));
  }, [observation]);

  return (
    <div id="observations" className="flex flex-col w-full">
      <ToastContainer />
      <div
        className=" flex  items-center  justify-around bg-transparent"
        id="filterinput"
      >
        <h2 className=" text-xl text-secondary font-bold">
          Les dernières observations postées
        </h2>
        <input
          className="border rounded-lg text-sm py-1 px-2 w-1/5 m-5"
          type="text"
          placeholder="rechercher par mot-clé !"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <select
          className="border rounded-lg text-sm py-1 px-2 w-1/5 m-5"
          type="text"
          placeholder="rechercher par mot-clé !"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        >
          <option value="">Filtrer l'affichage</option>
          <option value="">Uniquement par moi</option>
          <option value="">Tous les posts</option>
        </select>
      </div>

      <div className="flex flex-wrap justify-evenly w-full ">
        {observation &&
          observation
            .filter((el) => el.title.toLowerCase().includes(searchValue))
            .map((el, index) => (
              <Cards el={el} setObservation={setObservation} key={index} />
            ))}
      </div>
    </div>
  );
}

export default Observations;
