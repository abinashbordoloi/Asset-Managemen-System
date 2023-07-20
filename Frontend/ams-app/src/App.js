import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar"
import AssetEntryScreen from "./components/Screens/AssetEntryScreen";
import Navbar from "./components/Navbar";
import SupplyOrderScreen from "./components/Screens/SupplyOrderScreen";
import AddAssetScreen from './components/Screens/AddAssetScreen';
import UserScreen from './components/Screens/UserScreen';
import LocationScreen from './components/Screens/LocationScreen';
import Category from './components/Screens/Category'
import Challan from './components/Screens/Challan'
import Description from './components/Screens/Description'
import Installation from './components/Screens/Installation'
import Insurance from './components/Screens/Insurance'
import Invoice from './components/Screens/Invoice'
import PhysicalStatus from './components/Screens/PhysicalStatus'
import Procurement from './components/Screens/Procurement'
import TaggingStatus from './components/Screens/TaggingStatus'
import Vendor from './components/Screens/Vendor'



function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
       
        <Navbar />
       
        <Routes>
          <Route path="/" element={<AssetEntryScreen />} />

          <Route path="/add-asset" element={<AddAssetScreen />} />
          
          <Route path="/user" element={<UserScreen />} />
          
          <Route path="/supply-order" element={<SupplyOrderScreen />} />
          
          <Route path="/location" element={<LocationScreen />} />
          
          <Route path="/category" element={<Category />} />
          
          <Route path="/challan" element={<Challan />} />

          <Route path="/description" element={<Description />} />

          <Route path="/installation" element={<Installation />} />

          <Route path="/insurance" element={<Insurance />} />

          <Route path="/invoice" element={<Invoice />} />

          <Route path="/physicalstatus" element={<PhysicalStatus />} /> 

          <Route path="/procurement" element={<Procurement />} />

          <Route path="/taggingstatus" element={<TaggingStatus />} />

          <Route path="/vendor" element={<Vendor />} />

         
         

         
        </Routes>
       
      </Router>
    </div>
    
  );
}

export default App;