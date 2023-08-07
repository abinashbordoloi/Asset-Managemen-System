import React from "react";
import { Navbar, Nav , Button} from "react-bootstrap"; 
import Logo from "./Screens/R.png"
import { Link } from "react-router-dom";
function NavbarComponent({ username , handleLogout}) {

 

  return (
    <Navbar bg="medium" expand="lg" className="d-flex justify-content-between align-items-center" style={{ background: "#EAEAEA" }}>
     <Link to="/HomePage" style={{ textDecoration: 'none' }}>
      <div className="d-flex align-items-center ml-3" style={{ paddingLeft: "50px" }}>
        <img src={Logo} alt="Logo" width="30" height="30" className="mr-2" />
        <Navbar.Brand style={{ paddingLeft: "10px" }}>ASSET MANAGEMENT SYSTEM</Navbar.Brand>
      </div>
    </Link>

{/* Username of Logged-in User  */}
      <div>{username}</div>

      <Nav>
      <Nav style={{ paddingRight: "10px" }}>
      <Button variant="danger" onClick={handleLogout} href="/login"  >Logout</Button>
      </Nav>
      </Nav>
    </Navbar>
  );
}

export default NavbarComponent;
