import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import SideDashboard from "./components/SideMenu/SideDashboard"
import AssetEntryScreen from "./components/AssetEntryScreen";
import Navbar from "./components/Navbar";
import SupplyOrderScreen from "./components/SupplyOrderScreen";
import AddAssetScreen from './components/AddAssetScreen';
import UserScreen from './components/UserScreen';
import LocationScreen from './components/LocationScreen';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
       
        <Routes>
          <Route path="/" element={<AssetEntryScreen />} />
          <Route path="/supply-order" element={<SupplyOrderScreen />} />
          <Route path="/user" element={<UserScreen />} />
          <Route path="/location" element={<LocationScreen />} />
          <Route path="/add-asset" element={<AddAssetScreen />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
