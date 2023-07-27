import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const TaggingStatusForm = () => {
  const [taggingStatusData, setTaggingStatusData] = useState({
    status: "",
  });

  const addTaggingStatus = async () => {
    try {
      await axios.post("http://localhost:5000/api/public/add-TaggingStatus", taggingStatusData);
      console.log("Tagging status added successfully!");
      alert("Tagging status added successfully!");
      setTaggingStatusData({
        status: "",
      });
    } catch (error) {
      console.error("Error adding tagging status:", error);
      alert("Failed to add tagging status. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    setTaggingStatusData({ ...taggingStatusData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Tagging Status</h2>

      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Status"
          name="status"
          value={taggingStatusData.status}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button variant="primary" onClick={addTaggingStatus}>
        Add Tagging Status
      </Button>
    </div>
  );
};

export default TaggingStatusForm;
