import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TaggingStatusScreen = () => {
  const [taggingStatuses, setTaggingStatuses] = useState([]);
  const [editingTaggingStatusId, setEditingTaggingStatusId] = useState(null);
  const [editedTaggingStatus, setEditedTaggingStatus] = useState({
    status: "",
  });

  useEffect(() => {
    fetchTaggingStatuses();
  }, []);

  // Function to fetch tagging statuses from the API
  const fetchTaggingStatuses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/public/TaggingStatus");
      setTaggingStatuses(response.data);
    } catch (error) {
      console.error("Error fetching tagging statuses:", error);
    }
  };

  // Function to start editing a tagging status
  const handleEditTaggingStatus = (taggingStatus) => {
    setEditingTaggingStatusId(taggingStatus.id);
    setEditedTaggingStatus(taggingStatus);
  };

  // Function to handle input change for edited tagging status
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedTaggingStatus((prevTaggingStatus) => ({ ...prevTaggingStatus, [name]: value }));
  };

  // Function to save changes for the edited tagging status
  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/public/TaggingStatus/${editingTaggingStatusId}`,
        editedTaggingStatus
      );
      console.log("Tagging status updated successfully!");
      setEditingTaggingStatusId(null);
      fetchTaggingStatuses();
    } catch (error) {
      console.error("Error updating tagging status:", error);
    }
  };

  // Function to cancel editing a tagging status
  const handleCancelEdit = () => {
    setEditingTaggingStatusId(null);
  };

  return (
    <div>
      <h2>Tagging Statuses</h2>
      
      <Button variant="primary" href="/add-tagging-status" style={{ marginBottom: "10px" }}>
        Add New Tagging Status
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
          {taggingStatuses.map((taggingStatus) => (
            <tr key={taggingStatus.id}>
              <td>{taggingStatus.id}</td>
              <td>
                {editingTaggingStatusId === taggingStatus.id ? (
                  <Form.Control
                    type="text"
                    name="status"
                    value={editedTaggingStatus.status}
                    onChange={handleInputChange}
                  />
                ) : (
                  taggingStatus.status
                )}
              </td>
              <td>
                {editingTaggingStatusId === taggingStatus.id ? (
                  <>
                    <Button variant="success" onClick={handleSaveChanges}>
                      Save
                    </Button>{" "}
                    <Button variant="secondary" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="primary" onClick={() => handleEditTaggingStatus(taggingStatus)}>
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

export default TaggingStatusScreen;
