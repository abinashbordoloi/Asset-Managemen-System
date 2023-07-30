import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const PhysicalStatusScreen = () => {
  const navigate = useNavigate();
  const handleAddPhysicalStatusClick = () => {
    navigate("/add-physical-status");
  };
  const [physicalStatuses, setPhysicalStatuses] = useState([]);
  const [editingPhysicalStatusId, setEditingPhysicalStatusId] = useState(null);
  const [editedPhysicalStatus, setEditedPhysicalStatus] = useState({
    status: "",
  });

  useEffect(() => {
    fetchPhysicalStatuses();
  }, []);

  // Function to fetch physical statuses from the API
  const fetchPhysicalStatuses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/public/PhysicalStatus");
      setPhysicalStatuses(response.data);
    } catch (error) {
      console.error("Error fetching physical statuses:", error);
    }
  };

  // Function to start editing a physical status
  const handleEditPhysicalStatus = (physicalStatus) => {
    setEditingPhysicalStatusId(physicalStatus.id);
    setEditedPhysicalStatus(physicalStatus);
  };

  // Function to handle input change for edited physical status
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPhysicalStatus((prevPhysicalStatus) => ({ ...prevPhysicalStatus, [name]: value }));
  };

  // Function to save changes for the edited physical status
  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/public/PhysicalStatus/${editingPhysicalStatusId}`,
        editedPhysicalStatus
      );
      console.log("Physical status updated successfully!");
      setEditingPhysicalStatusId(null);
      fetchPhysicalStatuses();
    } catch (error) {
      console.error("Error updating physical status:", error);
    }
  };

  // Function to cancel editing a physical status
  const handleCancelEdit = () => {
    setEditingPhysicalStatusId(null);
  };

  return (
    <div>
      <h2>Physical Statuses</h2>
      
      <Button variant="primary" onClick={handleAddPhysicalStatusClick} style={{ marginBottom: "10px" }}>
        Add New Physical Status
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {physicalStatuses.map((physicalStatus) => (
            <tr key={physicalStatus.id}>
              <td>{physicalStatus.id}</td>
              <td>
                {editingPhysicalStatusId === physicalStatus.id ? (
                  <Form.Control
                    type="text"
                    name="status"
                    value={editedPhysicalStatus.status}
                    onChange={handleInputChange}
                  />
                ) : (
                  physicalStatus.status
                )}
              </td>
              <td>
                {editingPhysicalStatusId === physicalStatus.id ? (
                  <>
                    <Button variant="success" onClick={handleSaveChanges}>
                      Save
                    </Button>{" "}
                    <Button variant="secondary" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="primary" onClick={() => handleEditPhysicalStatus(physicalStatus)}>
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

export default PhysicalStatusScreen;
