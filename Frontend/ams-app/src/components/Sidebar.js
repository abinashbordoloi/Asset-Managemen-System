import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faBars,
} from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
  const handleLogout = () => {

  //clearuser session etc needs to be added
    window.location.href = "/login"
    alert("Logout clicked!");
  };
  
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className={`sidebar ${showSidebar ? 'active' : ''}`}>
      <div className="sidebar-header">
        <FontAwesomeIcon icon={faUsers} className="sidebar-icon" />
        <span className="sidebar-title">Dashboard</span>
      </div>
      <div className="sidebar-links">
        <Link to="/" className="sidebar-link" onClick={toggleSidebar}>         
          Asset
        </Link>

        <Link to="/user" className="sidebar-link" onClick={toggleSidebar}>
          Users
        </Link>

        <Link to="/location" className="sidebar-link" onClick={toggleSidebar}>
          Location
        </Link>

        <Link to="/supply-order" className="sidebar-link" onClick={toggleSidebar}>         
          SupplyOrder
        </Link>

        <Link to="/category" className="sidebar-link" onClick={toggleSidebar}>         
          Category
        </Link>

        <Link to="/challan" className="sidebar-link" onClick={toggleSidebar}>         
          Challan
        </Link>

        <Link to="/description" className="sidebar-link" onClick={toggleSidebar}>         
          Description
        </Link>

        <Link to="/installation" className="sidebar-link" onClick={toggleSidebar}>  
          Installation  
        </Link>

        <Link to="/insurance" className="sidebar-link" onClick={toggleSidebar}>
          Insurance
        </Link>

        <Link to="/invoice" className="sidebar-link" onClick={toggleSidebar}>
          Invoice
        </Link>

        <Link to="/physicalstatus" className="sidebar-link" onClick={toggleSidebar}>
          Physical Status
        </Link>
     
        <Link to="/procurement" className="sidebar-link" onClick={toggleSidebar}>
          Procurement
        </Link>


        <Link to="/taggingstatus" className="sidebar-link" onClick={toggleSidebar}>
          TaggingStatus
        </Link>

        <Link to="/vendor" className="sidebar-link" onClick={toggleSidebar}>
         Vendor
        </Link>
       

      </div>
      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="sidebar-toggle" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} className="toggle-icon" />
      </div>
    </div>
  );
};

export default Sidebar;
