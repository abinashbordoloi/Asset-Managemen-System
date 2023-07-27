import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const DescriptionForm = () => {
  const [descriptionData, setDescriptionData] = useState({
    make: "",
    specification: "",
    model: "",
  });

  const addDescription = async () => {
    try {
      await axios.post("http://localhost:5000/api/public/add-Description", descriptionData);
      console.log("Description added successfully!");
      alert("Description added successfully!");
      setDescriptionData({
        make: "",
        specification: "",
        model: "",
      });
    } catch (error) {
      console.error("Error adding description:", error);
      alert("Failed to add description. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    setDescriptionData({ ...descriptionData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Description</h2>

      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Make"
          name="make"
          value={descriptionData.make}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Specification"
          name="specification"
          value={descriptionData.specification}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Model"
          name="model"
          value={descriptionData.model}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button variant="primary" onClick={addDescription}>
        Add Description
      </Button>
    </div>
  );
};

export default DescriptionForm;
