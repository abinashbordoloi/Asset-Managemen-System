import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundImage from "./tablebg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faTimes } from "@fortawesome/free-solid-svg-icons";

const InsuranceScreen = () => {
  const navigate = useNavigate();
  const handleAddInsuranceClick = () => {
    navigate("/add-insurance");
  };
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
    <div className="bg-image h-100" 
  style={{ backgroundImage: `url(${backgroundImage})`, 
  backgroundSize: 'cover', 
  backgroundPosition: 'center', 
  height: "500px", overflowY: "auto",
}}>
      <div className="mask d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="card shadow-2-strong" style={{ backgroundColor: "#f5f7fa" }}>
                <div className="card-body">
      <h2>Insurances</h2>
      
      <Button variant="primary" onClick={handleAddInsuranceClick} className="mt-4 w-100"  style={{ marginBottom: "10px" }}>
        Add New Insurance
      </Button>
<div className="table-responsive" style={{  width: "1500px", margin: "auto" }} >
       <Table striped bordered hover className="mb-0">
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
                       <FontAwesomeIcon icon={faEdit} />
                    </Button>{" "}
                    <Button variant="secondary" onClick={handleCancelEdit}>
                       <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  </>
                ) : (
                  <Button variant="primary" onClick={() => handleEditInsurance(insurance)}>
                   <FontAwesomeIcon icon={faEdit} /> 
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
    </div>
      </div>
             </div>
           </div>
         </div>
       </div>
    </div>
  );
};

export default InsuranceScreen;
