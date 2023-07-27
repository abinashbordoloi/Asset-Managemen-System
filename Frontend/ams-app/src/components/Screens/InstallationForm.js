import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const InstallationForm = () => {
  const [installationData, setInstallationData] = useState({
    installation_date: "",
    commissioning_date: "",
  });

  const addInstallation = async () => {
    try {
      await axios.post("http://localhost:5000/api/public/add-Installation", installationData);
      console.log("Installation added successfully!");
      alert("Installation added successfully!");
      setInstallationData({
        installation_date: "",
        commissioning_date: "",
      });
    } catch (error) {
      console.error("Error adding installation:", error);
      alert("Failed to add installation. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    setInstallationData({ ...installationData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Installation</h2>

      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="date"
          name="installation_date"
          value={installationData.installation_date}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="date"
          name="commissioning_date"
          value={installationData.commissioning_date}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button variant="primary" onClick={addInstallation}>
        Add Installation
      </Button>
    </div>
  );
};

export default InstallationForm;
