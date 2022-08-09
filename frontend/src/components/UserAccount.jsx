import React, { useContext } from "react";
import { Link } from "react-router-dom";

import ExportContextUser from "../contexts/UserContext";
// import noPicProfile from "../assets/no_pic_profile.png";
import logout from "../assets/logout.png";
import nopic from "../assets/no_pic_profile.png";

function UserAccount() {
  const { profile, user } = useContext(ExportContextUser.UserContext);

  return (
    <div className="">
      <div className="flex items-center justify-end w-full  ">
        <button
          id="logout"
          type="submit"
          onClick={() => window.location.reload()}
        >
          <img className="mt-1 " src={logout} alt={logout} width="60px" />
        </button>
        {profile && profile.pseudo ? (
          <p className=" text-secondary font-semibold mr-2">{profile.pseudo}</p>
        ) : (
          <p className=" text-secondary font-semibold">Profil</p>
        )}
        {profile && profile.image_url ? (
          <Link to={`/profile/${user.id}`} className="nav-items ">
            <div
              id="cardprofilepicture"
              className="bg-secondary hover:scale-125  rounded-full m-1"
              style={{
                backgroundImage: `url(${profile.image_url})`,
              }}
            />
          </Link>
        ) : (
          <Link to={`/profile/${user.id}`} className="nav-items ">
            <div
              id="cardprofilepicture"
              className="media-left  bg-secondary  rounded-full"
              style={{
                backgroundImage: `url(${nopic})`,
              }}
            />
          </Link>
        )}
      </div>
    </div>
  );
}

export default UserAccount;
