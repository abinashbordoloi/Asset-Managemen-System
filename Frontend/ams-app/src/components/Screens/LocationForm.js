import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const LocationForm = () => {
  const [locationData, setLocationData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  const addLocation = async () => {
    try {
      await axios.post("http://localhost:5000/api/public/add-Location", locationData);
      console.log("Location added successfully!");
      alert("Location added successfully!");
      setLocationData({
        name: "",
        address: "",
        city: "",
        state: "",
        country: "",
      });
    } catch (error) {
      console.error("Error adding location:", error);
      alert("Failed to add location. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    setLocationData({ ...locationData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Location</h2>

      <Form.Group style={{ marginBottom: "10px" }}>
       
        <Form.Control
          type="text"
          placeholder="Name"
          name="name"
          value={locationData.name}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
      
        <Form.Control
          type="text"
          placeholder="Address"
          name="address"
          value={locationData.address}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
       
        <Form.Control
          type="text"
          placeholder="City"
          name="city"
          value={locationData.city}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="State"
          name="state"
          value={locationData.state}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Country"
          name="country"
          value={locationData.country}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button variant="primary" onClick={addLocation}>
        Add Location
      </Button>
    </div>
  );
};

export default LocationForm;
