import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function OtherUsersProfiles() {
  const { id } = useParams();

  const [profile, setProfile] = useState(null);
  const [count, setCount] = useState(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/profile/consulter/${id}`)
      .then((res) => setProfile(res.data));
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/observation/count/${id}`)
      .then((res) => setCount(res.data));
    console.log(count);
  }, []);

  return (
    <div
      className="  h-full w-full justify-center items-center "
      id="profilepage"
    >
      <div className="flex bg-primary shadow-xl opacity-90 items-center justify-around   m-10 rounded-3xl ">
        <div className="flex flex-col w- h-full justify-around items-center  rounded-tl-3xl rounded-bl-3xl border-r-secondary">
          <h2 className=" flex justify-between text-4xl text-secondary  text-center font-bold">
            Profil de {profile && profile.pseudo}
          </h2>
          <img
            className=" flex items-center justify-center  mt-3 mb-3 w-4/5 rounded-lg"
            src={profile && profile.image_url}
            alt={profile && profile.image_alt}
          />
          <div>
            <p className="flex justify-center text-2xl text-secondary  text-center font-bold">
              {count && count[0].numberofpost} Observations partagées
            </p>
          </div>
        </div>
        <div className="flex flex-col h-full w-2/3">
          <div className=" flex flex-col justify-center h-1/3 ">
            <h2 className=" flex justify-center text-2xl text-secondary  text-center font-bold mt-5 mb-5 ">
              Informations personelles
            </h2>
            <div className="flex flex-col justify-evenly items-center  m-5">
              <p className="text-lg text-third text-center ">
                Sa ville: {profile && profile.city}
              </p>
              <p className="text-lg text-third text-center ">
                Son sexe: {profile && profile.sexe}
              </p>
              <p className="text-lg text-third text-center ">
                Son Age: {profile && profile.age} ans
              </p>
            </div>
          </div>
          <div className=" flex flex-col justify-center h-1/3">
            <h2 className="flex justify-center text-2xl text-secondary  text-center font-bold mt-5 mb-5">
              SET UP{" "}
            </h2>
            <div className="flex flex-col justify-evenly items-center m-5 ">
              <p className="text-lg text-third text-center">
                Appareil de capture :{" "}
                <span className="text-secondary font-bold">
                  {profile && profile.camera}
                </span>
              </p>

              <p className="text-lg text-third text-center">
                Télescope :{" "}
                <span className="text-secondary font-bold">
                  {profile && profile.telescope}
                </span>
              </p>

              <p className="text-lg text-third text-center">
                Monture :{" "}
                <span className="text-secondary font-bold">
                  {profile && profile.monture}
                </span>
              </p>
            </div>
          </div>
          <div className=" flex flex-col justify-evenly h-1/3 w-full">
            <h2 className="flex justify-center text-2xl text-secondary  text-center font-bold mb-5 mt-5 ">
              Biographie
            </h2>
            <p className="text-lg text-third text-center  p-5 mb-5  ">
              {profile && profile.biography}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OtherUsersProfiles;
