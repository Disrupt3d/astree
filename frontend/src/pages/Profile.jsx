import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { ToastContainer } from "react-toastify";
import { notifySuccess, notifyError } from "../services/Toastify";
import "react-toastify/dist/ReactToastify.css";

function Profile() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/profile/${id}`)
      .then((res) => console.log(res.data));
  }, []);
  return (
    <div>
      <h1>Profile</h1>
    </div>
  );
}

export default Profile;
