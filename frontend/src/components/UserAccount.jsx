import React, { useContext } from "react";
import ExportContextUser from "../contexts/UserContext";
// import noPicProfile from "../assets/no_pic_profile.png";

function UserAccount() {
  const { user } = useContext(ExportContextUser.UserContext);
  return (
    <div className="flex items-center ">
      {user && user[0].pseudo ? (
        <p className="mr-5 text-secondary font-semibold">{user[0].pseudo}</p>
      ) : (
        <p className="mr-5 text-secondary font-semibold">Profil</p>
      )}
      {user && user[0].image_url ? (
        <div
          id="cardprofilepicture"
          className="bg-secondary  rounded-full"
          style={{
            backgroundImage: `url(${user[0].image_url})`,
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
  );
}

export default UserAccount;
