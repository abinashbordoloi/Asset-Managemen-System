import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
// import AssetEntryScreen from "./components/Screens/AssetEntryScreen";
import LoginScreen from "./components/LoginScreen";
// import routes from "./Routing";

import AssetEntryScreen from "./components/Screens/AssetEntryScreen";
import SupplyOrderScreen from "./components/Screens/SupplyOrderScreen";
import AddAssetScreen from "./components/Screens/AddAssetScreen";
import UserScreen from "./components/Screens/UserScreen";
import LocationScreen from "./components/Screens/LocationScreen";
import Category from "./components/Screens/Category";
import Challan from "./components/Screens/Challan";
import Description from "./components/Screens/Description";
import Installation from "./components/Screens/Installation";
import Insurance from "./components/Screens/Insurance";
import Invoice from "./components/Screens/Invoice";
import PhysicalStatus from "./components/Screens/PhysicalStatus";
import Procurement from "./components/Screens/Procurement";
import TaggingStatus from "./components/Screens/TaggingStatus";
import Vendor from "./components/Screens/Vendor";
import LocationForm from "./components/Screens/LocationForm";
import CategoryForm from "./components/Screens/CategoryForm";
import ChallanForm from "./components/Screens/ChallanForm";
import DescriptionForm from "./components/Screens/DescriptionForm";
import InstallationForm from "./components/Screens/InstallationForm";
import InsuranceForm from "./components/Screens/InsuranceForm";
import InvoiceForm from "./components/Screens/InvoiceForm";
import VendorForm from "./components/Screens/VendorForm";
import TaggingStatusForm from "./components/Screens/TaggingStatusForm";
import ProcurementForm from "./components/Screens/ProcurementForm";
import PhysicalStatusForm from "./components/Screens/PhysicalStatusForm";
import SupplyOrderForm from "./components/Screens/SupplyOrderForm";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    console.log("Logged in successfully!");
  };

  return (
    <div className="App">
      <Router>
        {isLoggedIn && <Sidebar />}
        {isLoggedIn && <Navbar />}
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

          {/* Show the LoginScreen if not logged in */}
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

          {/* If isLoggedIn is true, show the AssetEntryScreen */}
          {/* {isLoggedIn && <Routing />} */}

          {isLoggedIn && (<Route path="/asset-entry" element={<AssetEntryScreen />} />)}
      
            <Route path="/add-asset" element={<AddAssetScreen />} />
          
          {isLoggedIn && (<Route path="/user" element={<UserScreen />} />)}
          {isLoggedIn && (
            <Route path="/supply-order" element={<SupplyOrderScreen />} />
          )}
          {isLoggedIn && (
            <Route path="/location" element={<LocationScreen />} />
          )}
          {isLoggedIn && (<Route path="/category" element={<Category />} />)}
          {isLoggedIn &&(<Route path="/challan" element={<Challan />} />)}
          {isLoggedIn && (
            <Route path="/description" element={<Description />} />
          )}
          {isLoggedIn && (
            <Route path="/installation" element={<Installation />} />
          )}
          {isLoggedIn && (<Route path="/insurance" element={<Insurance />} />)}
          {isLoggedIn && (<Route path="/invoice" element={<Invoice />} />)}
          {isLoggedIn && (
            <Route path="/physicalstatus" element={<PhysicalStatus />} />
          )}
          {isLoggedIn && (
            <Route path="/procurement" element={<Procurement />} />
          )}
          {isLoggedIn && (
            <Route path="/taggingstatus" element={<TaggingStatus />} />
          )}
          {isLoggedIn && ( <Route path="/vendor" element={<Vendor />} />)}
          {isLoggedIn && (
            <Route path="/add-category" element={<CategoryForm />} />
          )}
          {isLoggedIn && (
            <Route path="/add-location" element={<LocationForm />} />
          )}
          {isLoggedIn && (
            <Route path="/add-challan" element={<ChallanForm />} />
          )}
          {isLoggedIn && (
            <Route path="/add-description" element={<DescriptionForm />} />
          )}
          {isLoggedIn && (
            <Route path="/add-installation" element={<InstallationForm />} />
          )}
          {isLoggedIn && (
            <Route path="/add-insurance" element={<InsuranceForm />} />
          )}
          {isLoggedIn && (
            <Route path="/add-invoice" element={<InvoiceForm />} />
          )}
          {isLoggedIn && (
            <Route
              path="/add-physical-status"
              element={<PhysicalStatusForm />}
            />
          )}
          {isLoggedIn && (
            <Route path="/add-procurement" element={<ProcurementForm />} />
          )}
          {isLoggedIn && (
            <Route path="/add-tagging-status" element={<TaggingStatusForm />} />
          )}
          {isLoggedIn && <Route path="/add-vendor" element={<VendorForm />} />}
          {isLoggedIn && (
            <Route path="/add-supply-order" element={<SupplyOrderForm />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;

// import React from "react";
// import { BrowserRouter as Router } from "react-router-dom";
// import "./App.css";
// import Sidebar from "./components/Sidebar";
// import Navbar from "./components/Navbar";
// import routes from "./Routing";

// function App() {
//   return (
//     <div className="App">
//       <Router>
//         <Sidebar />
//         <Navbar />
//         {routes()}
//       </Router>
//     </div>
//   );
// }

// export default App;
