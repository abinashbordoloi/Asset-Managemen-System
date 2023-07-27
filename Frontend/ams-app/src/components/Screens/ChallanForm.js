import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const ChallanForm = () => {
  const [challanData, setChallanData] = useState({
    challan_details: "",
  });

  const addChallan = async () => {
    try {
      await axios.post("http://localhost:5000/api/public/add-Challan", challanData);
      console.log("Challan added successfully!");
      alert("Challan added successfully!");
      setChallanData({
        challan_details: "",
      });
    } catch (error) {
      console.error("Error adding challan:", error);
      alert("Failed to add challan. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    setChallanData({ ...challanData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Challan</h2>

      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Challan Details"
          name="challan_details"
          value={challanData.challan_details}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button variant="primary" onClick={addChallan}>
        Add Challan
      </Button>
    </div>
  );
};

export default ChallanForm;
