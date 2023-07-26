import "./App.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import AssetEntryScreen from "./components/AssetEntryScreen";
import LoginScreen from "./components/LoginScreen";
// import { useNavigate } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Navbar from "./components/Navbar";

import SupplyOrderScreen from "./components/SupplyOrderScreen";
import ProcurementDetails from "./components/ProcurementDetails";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoggedIn(true);
    // navigate("/assetentry");
    console.log("chal raha hain");
  };

  return (
    <Router>
      {isLoggedIn && <Navbar />}
      <Routes>
        {/* Route for the root path */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/assetentry" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Show the LoginScreen if not logged in */}
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/assetentry" />
            ) : (
              <LoginScreen onLogin={handleLogin} />
            )
          }
        />

        {/* If isLoggedIn is true, show the AssetEntryScreen */}
        {isLoggedIn && (
          <Route
            path="/assetentry"
            element={<AssetEntryScreen isLoggedIn={isLoggedIn} />}
          />
        )}
        {isLoggedIn && (
          <Route path="/supply-order" element={<SupplyOrderScreen />} />
        )}
        {isLoggedIn && (
          <Route path="/procurementdetails" element={<ProcurementDetails />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
