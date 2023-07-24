// import "./App.css";
// import AssetEntryScreen from "./components/AssetEntryScreen";
// // import Navbar from "./components/Navbar";
// import LoginScreen from "./components/LoginScreen";
// // import SupplyOrderScreen from "./components/SupplyOrderScreen";
// import { Route, Routes } from "react-router-dom";
// // import { BrowserRouter as Router } from "react-router-dom";

// import { Navigate } from "react-router-dom";
// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Navigate to="/login" />} />
//       <Route path="/login" element={<LoginScreen />} />
//       <Route path="/asset-entry" element={<AssetEntryScreen />} />
//     </Routes>
//   );
// }

// export default App;

// App.js or App.jsx

import "./App.css";
import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import AssetEntryScreen from "./components/AssetEntryScreen";
import LoginScreen from "./components/LoginScreen";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    // Perform login logic and set the isLoggedIn state to true upon successful login
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <Routes>
        {/* Route for the root path */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/asset-entry" />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/asset-entry" />
            ) : (
              <LoginScreen onLogin={handleLogin} />
            )
          }
        />
        {/* {isLoggedIn && (
          <Route path="/asset-entry" element={<AssetEntryScreen />} />
        )} */}
      </Routes>
    </Router>
  );
}

export default App;
