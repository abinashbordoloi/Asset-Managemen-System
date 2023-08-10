import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import backgroundImage from "./tablebg.jpg";

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
              <div className="card shadow-2-strong" style={{ backgroundColor: "#d9d9d" }}>
                <div className="card-body">
      <h2>Add New Location</h2>
      <div className="form-responsive" style={{ height:"300px", width: "1000px", margin: "auto" }} >
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
    </div>
    </div>
               </div>
             </div>
           </div>
           </div>
           </div>
  );
};

export default LocationForm;
