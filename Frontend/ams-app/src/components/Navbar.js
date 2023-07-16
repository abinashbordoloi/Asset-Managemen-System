import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";

function AppNavbar() {
  const handleLogout = () => {
    // Perform logout logic here
    
    // Redirect to the login page
    window.location.href = "/login";
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand>
        Asset-Management-System
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/" active>
            Asset
          </Nav.Link>
          <Nav.Link as={Link} to="/supply-order">
            SupplyOrder
          </Nav.Link>
          <Nav.Link as={Link} to="/user">
            Users
          </Nav.Link>
          <Nav.Link as={Link} to="/location">
            Location
          </Nav.Link>
          <Nav.Link href="#" onClick={handleLogout}>
            Logout
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default AppNavbar;
