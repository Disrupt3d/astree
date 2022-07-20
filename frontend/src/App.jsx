import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ExportContext from "./contexts/UserContext";

import Login from "./pages/Login";
import Observations from "./pages/Observations";
import NewObservation from "./pages/NewObservation";
import Events from "./pages/Events";
import Profile from "./pages/Profile";

import "./App.css";
// import "bulma/css/bulma.min.css";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <ExportContext.UserProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/observations" element={<Observations />} />
            <Route path="/observations/add" element={<NewObservation />} />
            <Route path="/evenements" element={<Events />} />
            <Route path="/profil" element={<Profile />} />
            <Route path="/" element={<Navigate to="login" />} />
          </Routes>
        </Router>
      </ExportContext.UserProvider>
    </div>
  );
}

export default App;
