import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const InsuranceScreen = () => {
  const [insurances, setInsurances] = useState([]);
  const [editingInsuranceId, setEditingInsuranceId] = useState(null);
  const [editedInsurance, setEditedInsurance] = useState({
    start_date: "",
    end_date: "",
    insurance_company: "",
    insurance_no: "",
    insurance_period: "",
  });

  useEffect(() => {
    fetchInsurances();
  }, []);

  // Function to fetch insurances from the API
  const fetchInsurances = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/public/Insurance");
      setInsurances(response.data);
    } catch (error) {
      console.error("Error fetching insurances:", error);
    }
  };

  // Function to start editing an insurance
  const handleEditInsurance = (insurance) => {
    setEditingInsuranceId(insurance.id);
    setEditedInsurance(insurance);
  };

  // Function to handle input change for edited insurance
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInsurance((prevInsurance) => ({ ...prevInsurance, [name]: value }));
  };

  // Function to save changes for the edited insurance
  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/public/Insurance/${editingInsuranceId}`,
        editedInsurance
      );
      console.log("Insurance updated successfully!");
      setEditingInsuranceId(null);
      fetchInsurances();
    } catch (error) {
      console.error("Error updating insurance:", error);
    }
  };

  // Function to cancel editing an insurance
  const handleCancelEdit = () => {
    setEditingInsuranceId(null);
  };

  return (
    <div>
      <h2>Insurances</h2>
      
      <Button variant="primary" href="/add-insurance" style={{ marginBottom: "10px" }}>
        Add New Insurance
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Insurance Company</th>
            <th>Insurance No</th>
            <th>Insurance Period</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {insurances.map((insurance) => (
            <tr key={insurance.id}>
              <td>{insurance.id}</td>
              <td>
                {editingInsuranceId === insurance.id ? (
                  <Form.Control
                    type="date"
                    name="start_date"
                    value={editedInsurance.start_date}
                    onChange={handleInputChange}
                  />
                ) : (
                  insurance.start_date
                )}
              </td>
              <td>
                {editingInsuranceId === insurance.id ? (
                  <Form.Control
                    type="date"
                    name="end_date"
                    value={editedInsurance.end_date}
                    onChange={handleInputChange}
                  />
                ) : (
                  insurance.end_date
                )}
              </td>
              <td>
                {editingInsuranceId === insurance.id ? (
                  <Form.Control
                    type="text"
                    name="insurance_company"
                    value={editedInsurance.insurance_company}
                    onChange={handleInputChange}
                  />
                ) : (
                  insurance.insurance_company
                )}
              </td>
              <td>
                {editingInsuranceId === insurance.id ? (
                  <Form.Control
                    type="text"
                    name="insurance_no"
                    value={editedInsurance.insurance_no}
                    onChange={handleInputChange}
                  />
                ) : (
                  insurance.insurance_no
                )}
              </td>
              <td>
                {editingInsuranceId === insurance.id ? (
                  <Form.Control
                    type="text"
                    name="insurance_period"
                    value={editedInsurance.insurance_period}
                    onChange={handleInputChange}
                  />
                ) : (
                  insurance.insurance_period
                )}
              </td>
              <td>
                {editingInsuranceId === insurance.id ? (
                  <>
                    <Button variant="success" onClick={handleSaveChanges}>
                      Save
                    </Button>{" "}
                    <Button variant="secondary" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="primary" onClick={() => handleEditInsurance(insurance)}>
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

export default InsuranceScreen;
