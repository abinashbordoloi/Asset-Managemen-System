import React from "react";
// import { Link } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
//import "./Navbar.css"; // Import the CSS file

function NavbarComponent() {
  const handleLogout = () => {
    // Perform logout logic here

    // Redirect to the login page
    window.location.href = "/login";
  };

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <Nav.Link as={Link} to="/" active>
            Home
          </Nav.Link> */}
          {/* <Nav.Link as={Link} to="/asset" active>
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
          </Nav.Link> */}
           <Nav>
            <Nav.Link href="/" onClick={handleLogout}>
              Logout
            </Nav.Link> 
          </Nav> 
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default NavbarComponent;
