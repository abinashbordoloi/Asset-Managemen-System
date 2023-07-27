import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const DescriptionScreen = () => {
  const [descriptions, setDescriptions] = useState([]);
  const [editingDescriptionId, setEditingDescriptionId] = useState(null);
  const [editedDescription, setEditedDescription] = useState({
    make: "",
    specification: "",
    model: "",
  });

  useEffect(() => {
    fetchDescriptions();
  }, []);

  // Function to fetch descriptions from the API
  const fetchDescriptions = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/public/Description");
      setDescriptions(response.data);
    } catch (error) {
      console.error("Error fetching descriptions:", error);
    }
  };

  // Function to start editing a description
  const handleEditDescription = (description) => {
    setEditingDescriptionId(description.id);
    setEditedDescription(description);
  };

  // Function to handle input change for edited description
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedDescription((prevDescription) => ({ ...prevDescription, [name]: value }));
  };

  // Function to save changes for the edited description
  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/public/Description/${editingDescriptionId}`,
        editedDescription
      );
      console.log("Description updated successfully!");
      setEditingDescriptionId(null);
      fetchDescriptions();
    } catch (error) {
      console.error("Error updating description:", error);
    }
  };

  // Function to cancel editing a description
  const handleCancelEdit = () => {
    setEditingDescriptionId(null);
  };

  return (
    <div>
      <h2>Descriptions</h2>

      <Button variant="primary" href="/add-description" style={{ marginBottom: "10px" }}>
        Add New Description
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Make</th>
            <th>Specification</th>
            <th>Model</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {descriptions.map((description) => (
            <tr key={description.id}>
              <td>{description.id}</td>
              <td>
                {editingDescriptionId === description.id ? (
                  <Form.Control
                    type="text"
                    name="make"
                    value={editedDescription.make}
                    onChange={handleInputChange}
                  />
                ) : (
                  description.make
                )}
              </td>
              <td>
                {editingDescriptionId === description.id ? (
                  <Form.Control
                    type="text"
                    name="specification"
                    value={editedDescription.specification}
                    onChange={handleInputChange}
                  />
                ) : (
                  description.specification
                )}
              </td>
              <td>
                {editingDescriptionId === description.id ? (
                  <Form.Control
                    type="text"
                    name="model"
                    value={editedDescription.model}
                    onChange={handleInputChange}
                  />
                ) : (
                  description.model
                )}
              </td>
              <td>
                {editingDescriptionId === description.id ? (
                  <>
                    <Button variant="success" onClick={handleSaveChanges}>
                      Save
                    </Button>{" "}
                    <Button variant="secondary" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="primary" onClick={() => handleEditDescription(description)}>
                    Edit
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DescriptionScreen;
