import React, { useContext } from "react";

import ExportContextUser from "../contexts/UserContext";
// import noPicProfile from "../assets/no_pic_profile.png";
import logout from "../assets/logout.png";

function UserAccount() {
  const { profile } = useContext(ExportContextUser.UserContext);

  return (
    <div className="">
      <div className="flex items-center justify-center ">
        <button
          id="logout"
          type="submit"
          onClick={() => window.location.reload()}
        >
          <img className="mr-5 " src={logout} alt={logout} width="60px" />
        </button>
        {profile && profile.pseudo ? (
          <p className="mr-5 text-secondary font-semibold">{profile.pseudo}</p>
        ) : (
          <p className="mr-5 text-secondary font-semibold">Profil</p>
        )}
        {profile && profile.image_url ? (
          <div
            id="cardprofilepicture"
            className="bg-secondary hover:scale-125  rounded-full m-5"
            style={{
              backgroundImage: `url(${profile.image_url})`,
            }}
          />
        ) : (
          <div
            id="cardprofilepicture"
            className="media-left  bg-secondary  rounded-full"
            style={{
              backgroundImage: `url(./assets/no_pic_profile.png)`,
            }}
          />
        )}
      </div>
    </div>
  );
}

export default UserAccount;
