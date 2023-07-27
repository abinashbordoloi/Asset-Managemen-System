import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const VendorForm = () => {
  const [vendorData, setVendorData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  const addVendor = async () => {
    try {
      await axios.post("http://localhost:5000/api/public/add-Vendor", vendorData);
      console.log("Vendor added successfully!");
      alert("Vendor added successfully!");
      setVendorData({
        name: "",
        address: "",
        city: "",
        state: "",
        country: "",
      });
    } catch (error) {
      console.error("Error adding vendor:", error);
      alert("Failed to add vendor. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    setVendorData({ ...vendorData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Vendor</h2>

      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Name"
          name="name"
          value={vendorData.name}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Address"
          name="address"
          value={vendorData.address}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="City"
          name="city"
          value={vendorData.city}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="State"
          name="state"
          value={vendorData.state}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Country"
          name="country"
          value={vendorData.country}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button variant="primary" onClick={addVendor}>
        Add Vendor
      </Button>
    </div>
  );
};

export default VendorForm;
