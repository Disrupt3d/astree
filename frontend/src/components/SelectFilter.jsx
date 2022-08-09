/* eslint-disable react/prop-types */
import React from "react";

function SelectFilter({ filterObservation, setFilterObservation }) {
  const handleFilter = (e) => {
    setFilterObservation(e.target.value);
  };
  return (
    <div>
      <select
        className=" font-bold rounded-lg text-primary py-1 px-2  m-5"
        type="text"
        placeholder="rechercher par mot-clé !"
        value={filterObservation}
        onChange={(e) => handleFilter(e)}
      >
        <option value="2">Tous les posts</option>
        <option value="1">Uniquement par moi</option>
      </select>
    </div>
  );
}

export default SelectFilter;
