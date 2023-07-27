import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const InstallationScreen = () => {
  const [installations, setInstallations] = useState([]);
  const [editingInstallationId, setEditingInstallationId] = useState(null);
  const [editedInstallation, setEditedInstallation] = useState({
    installation_date: "",
    commissioning_date: "",
  });

  useEffect(() => {
    fetchInstallations();
  }, []);

  // Function to fetch installations from the API
  const fetchInstallations = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/public/Installation");
      setInstallations(response.data);
    } catch (error) {
      console.error("Error fetching installations:", error);
    }
  };

  // Function to start editing an installation
  const handleEditInstallation = (installation) => {
    setEditingInstallationId(installation.id);
    setEditedInstallation(installation);
  };

  // Function to handle input change for edited installation
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInstallation((prevInstallation) => ({ ...prevInstallation, [name]: value }));
  };

  // Function to save changes for the edited installation
  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/public/Installation/${editingInstallationId}`,
        editedInstallation
      );
      console.log("Installation updated successfully!");
      setEditingInstallationId(null);
      fetchInstallations();
    } catch (error) {
      console.error("Error updating installation:", error);
    }
  };

  // Function to cancel editing an installation
  const handleCancelEdit = () => {
    setEditingInstallationId(null);
  };

  return (
    <div>
      <h2>Installations</h2>
      
      <Button variant="primary" href="/add-installation" style={{ marginBottom: "10px" }}>
        Add New Installation
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Installation Date</th>
            <th>Commissioning Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {installations.map((installation) => (
            <tr key={installation.id}>
              <td>{installation.id}</td>
              <td>
                {editingInstallationId === installation.id ? (
                  <Form.Control
                    type="date"
                    name="installation_date"
                    value={editedInstallation.installation_date}
                    onChange={handleInputChange}
                  />
                ) : (
                  installation.installation_date
                )}
              </td>
              <td>
                {editingInstallationId === installation.id ? (
                  <Form.Control
                    type="date"
                    name="commissioning_date"
                    value={editedInstallation.commissioning_date}
                    onChange={handleInputChange}
                  />
                ) : (
                  installation.commissioning_date
                )}
              </td>
              <td>
                {editingInstallationId === installation.id ? (
                  <>
                    <Button variant="success" onClick={handleSaveChanges}>
                      Save
                    </Button>{" "}
                    <Button variant="secondary" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="primary" onClick={() => handleEditInstallation(installation)}>
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

export default InstallationScreen;
