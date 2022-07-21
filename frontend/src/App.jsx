import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExportContextUser from "./contexts/UserContext";

import Observations from "./pages/Observations";
import NewObservation from "./pages/NewObservation";
import Events from "./pages/Events";
import Profile from "./pages/Profile";

import "./App.css";
import ConnexionLayout from "./layouts/ConnexionLayout";
import Signin from "./components/Signin";
import Login from "./components/Login";
import ProtectedRoute from "./layouts/ProtectedRoute";
import UserLoggedLayout from "./layouts/UserLoggedLayout";
import UpdateObservation from "./pages/UpdateObservation";
// import "bulma/css/bulma.min.css";

function App() {
  const { user } = useContext(ExportContextUser.UserContext);
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<ConnexionLayout />}>
            <Route path="" element={<Signin />} />
            <Route path="login/" element={<Login />} />
          </Route>
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <UserLoggedLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/observations" element={<Observations />} />
            <Route path="/observations/ajouter" element={<NewObservation />} />
            <Route path="/evenements" element={<Events />} />
            <Route path="/profil" element={<Profile />} />
            <Route
              path="/observations/modifier/:id"
              element={<UpdateObservation />}
            />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
