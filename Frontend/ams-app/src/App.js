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
import "./App.css";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AssetEntryScreen from "./components/AssetEntryScreen";
import LoginScreen from "./components/LoginScreen";
import { useNavigate } from "react-router-dom";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    // Perform login logic and set the isLoggedIn state to true upon successful login
    setIsLoggedIn(true);
    navigate("/asset-entry");
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={!isLoggedIn ? navigate("/login") : navigate("/asset-entry")}
        />
        <Route path="/login" element={<LoginScreen onLogin={handleLogin} />} />
        {isLoggedIn && (
          <Route path="/asset-entry" element={<AssetEntryScreen />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
