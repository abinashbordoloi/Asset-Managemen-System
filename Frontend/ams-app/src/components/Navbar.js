import React from "react";
import { Link, BrowserRouter as Router, Route, Routes } from "react-router-dom";
// import LoginPage from "./LoginScreen";
import AssetEntryScreen from "../components/AssetEntryScreen";
import SupplyOrderScreen from "../components/SupplyOrderScreen";

function Navbar() {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              Navbar
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link
                    className="nav-link active"
                    aria-current="page"
                    to="/asset-entry"
                  >
                    Asset Entry
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/supply-order">
                    Supply Order
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
      <Routes>
        <Route path="/asset-entry" element={<AssetEntryScreen />} />
        <Route path="/supply-order" element={<SupplyOrderScreen />} />
      </Routes>
    </Router>
  );
}

export default Navbar;
