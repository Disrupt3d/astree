/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useEffect } from "react";
import axios from "axios";

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState();
  const [refresh, setRefresh] = useState(true);
  const [profile, setProfile] = useState(null);
  const handleUser = (data) => {
    setUser({ ...user, ...data });
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/profile/${user && user.id}`)
      .then((res) => setProfile(res.data));
  }, [refresh, user]);
  return (
    <UserContext.Provider
      value={{
        user,
        handleUser,
        profile,
        refresh,
        setRefresh,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
const ExportContext = {
  UserContext,
  UserProvider,
};
export default ExportContext;
