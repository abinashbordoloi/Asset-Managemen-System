import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import "./SideDashboard.css";

function SideDashboard() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`side-dashboard ${isOpen ? "open" : ""}`}>
      <div className="dashboard-toggle" onClick={toggleSidebar}>
        <FaBars />
      </div>
      <ul className="dashboard-menu">
        <li>
          <Link to="/" className="dashboard-link" activeClassName="active">
            Asset
          </Link>
        </li>
        <li>
          <Link to="/supply-order" className="dashboard-link" activeClassName="active">
            SupplyOrder
          </Link>
        </li>
        <li>
          <Link to="/user" className="dashboard-link" activeClassName="active">
            Users
          </Link>
        </li>
        <li>
          <Link to="/location" className="dashboard-link" activeClassName="active">
            Location
          </Link>
        </li>
        <li>
          <Link to="/logout" className="dashboard-link" activeClassName="active">
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default SideDashboard;
