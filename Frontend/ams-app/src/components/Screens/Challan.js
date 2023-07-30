import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const ChallanScreen = () => {
  const navigate = useNavigate();

  const handleAddChallanClick = () => {
    navigate("/add-challan");
  };
  const [challans, setChallans] = useState([]);
  const [editingChallanId, setEditingChallanId] = useState(null);
  const [editedChallan, setEditedChallan] = useState({
    challan_details: "",
  });

  useEffect(() => {
    fetchChallans();
  }, []);

  // Function to fetch challans from the API
  const fetchChallans = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/public/Challan");
      setChallans(response.data);
    } catch (error) {
      console.error("Error fetching challans:", error);
    }
  };

  // Function to start editing a challan
  const handleEditChallan = (challan) => {
    setEditingChallanId(challan.id);
    setEditedChallan(challan);
  };

  // Function to handle input change for edited challan
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedChallan((prevChallan) => ({ ...prevChallan, [name]: value }));
  };

  // Function to save changes for the edited challan
  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/public/Challan/${editingChallanId}`,
        editedChallan
      );
      console.log("Challan updated successfully!");
      setEditingChallanId(null);
      fetchChallans();
    } catch (error) {
      console.error("Error updating challan:", error);
    }
  };

  // Function to cancel editing a challan
  const handleCancelEdit = () => {
    setEditingChallanId(null);
  };

  return (
    <div>
      <h2>Challans</h2>

      <Button variant="primary" onClick={handleAddChallanClick} style={{ marginBottom: "10px" }}>
        Add New Challan details
      </Button>


      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Challan Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {challans.map((challan) => (
            <tr key={challan.id}>
              <td>{challan.id}</td>
              <td>
                {editingChallanId === challan.id ? (
                  <Form.Control
                    as="textarea"
                    name="challan_details"
                    value={editedChallan.challan_details}
                    onChange={handleInputChange}
                  />
                ) : (
                  challan.challan_details
                )}
              </td>
              <td>
                {editingChallanId === challan.id ? (
                  <>
                    <Button variant="success" onClick={handleSaveChanges}>
                      Save
                    </Button>{" "}
                    <Button variant="secondary" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="primary" onClick={() => handleEditChallan(challan)}>
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

export default ChallanScreen;
