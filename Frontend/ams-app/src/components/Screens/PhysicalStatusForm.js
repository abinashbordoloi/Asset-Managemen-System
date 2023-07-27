import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const PhysicalStatusForm = () => {
  const [physicalStatusData, setPhysicalStatusData] = useState({
    status: "",
  });

  const addPhysicalStatus = async () => {
    try {
      await axios.post("http://localhost:5000/api/public/add-PhysicalStatus", physicalStatusData);
      console.log("Physical status added successfully!");
      alert("Physical status added successfully!");
      setPhysicalStatusData({
        status: "",
      });
    } catch (error) {
      console.error("Error adding physical status:", error);
      alert("Failed to add physical status. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    setPhysicalStatusData({ ...physicalStatusData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Physical Status</h2>

      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Status"
          name="status"
          value={physicalStatusData.status}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button variant="primary" onClick={addPhysicalStatus}>
        Add Physical Status
      </Button>
    </div>
  );
};

export default PhysicalStatusForm;
