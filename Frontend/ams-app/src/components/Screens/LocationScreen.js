import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundImage from "./tablebg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTimes } from "@fortawesome/free-solid-svg-icons";

const LocationScreen = () => {
  const navigate = useNavigate();
  const handleAddLocationClick = () => {
    navigate("/add-location");
  };
  const [locations, setLocations] = useState([]);
  const [editingLocationId, setEditingLocationId] = useState(null);
  const [editedLocation, setEditedLocation] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    fetchLocations();
  }, []);

  // Fetch locations
  const fetchLocations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/public/Location");
      setLocations(response.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  // Edit location
  const handleEditLocation = (location) => {
    setEditingLocationId(location.id);
    setEditedLocation(location);
  };

  // Handle input change while editing
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedLocation((prevLocation) => ({ ...prevLocation, [name]: value }));
  };

  // Save edited location
  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/public/Location/${editingLocationId}`,
        editedLocation
      );
      console.log("Location updated successfully!");
      setEditingLocationId(null);
      fetchLocations();
    } catch (error) {
      console.error("Error updating location:", error);
    }
  };

  // Cancel editing
  const handleCancelEdit = () => {
    setEditingLocationId(null);
  };

  return (
    <div className="bg-image h-100" 
  style={{ backgroundImage: `url(${backgroundImage})`, 
  backgroundSize: 'cover', 
  backgroundPosition: 'center', 
  height: "500px", overflowY: "auto",
}}>
      <div className="mask d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="card shadow-2-strong" style={{ backgroundColor: "#f5f7fa" }}>
                <div className="card-body">
      <h2>Locations</h2>
      <Button variant="primary" onClick={handleAddLocationClick} className="mt-4 w-100" style={{ marginBottom: "10px" }}>
        Add New Location
      </Button>
      <div className="table-responsive" style={{  width: "1000px", margin: "auto" }} >
       <Table striped bordered hover className="mb-0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location.id}>
              <td>{location.id}</td>
              <td>
                {editingLocationId === location.id ? (
                  <Form.Control
                    type="text"
                    name="name"
                    value={editedLocation.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  location.name
                )}
              </td>
              <td>
                {editingLocationId === location.id ? (
                  <Form.Control
                    type="text"
                    name="address"
                    value={editedLocation.address}
                    onChange={handleInputChange}
                  />
                ) : (
                  location.address
                )}
              </td>
              <td>
                {editingLocationId === location.id ? (
                  <Form.Control
                    type="text"
                    name="city"
                    value={editedLocation.city}
                    onChange={handleInputChange}
                  />
                ) : (
                  location.city
                )}
              </td>
              <td>
                {editingLocationId === location.id ? (
                  <Form.Control
                    type="text"
                    name="state"
                    value={editedLocation.state}
                    onChange={handleInputChange}
                  />
                ) : (
                  location.state
                )}
              </td>
              <td>
                {editingLocationId === location.id ? (
                  <Form.Control
                    type="text"
                    name="country"
                    value={editedLocation.country}
                    onChange={handleInputChange}
                  />
                ) : (
                  location.country
                )}
              </td>
              <td>
                {editingLocationId === location.id ? (
                  <>
                    <Button variant="success" onClick={handleSaveChanges}>
                      <FontAwesomeIcon icon={faEdit} /> 
                    </Button>{" "}
                    <Button variant="secondary" onClick={handleCancelEdit}>
                     <FontAwesomeIcon icon={faTimes} /> 
                    </Button>
                  </>
                ) : (
                  <Button variant="primary" onClick={() => handleEditLocation(location)}>
                     <FontAwesomeIcon icon={faEdit} /> 
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
     </div>
               </div>
             </div>
           </div>
         </div>
       </div>
    </div>
  );
};

export default LocationScreen;
