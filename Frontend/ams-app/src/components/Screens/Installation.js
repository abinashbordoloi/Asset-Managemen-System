import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundImage from "./tablebg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faTimes } from "@fortawesome/free-solid-svg-icons";

const InstallationScreen = () => {
  const navigate = useNavigate();
  const handleAddInstallationClick = () => {
    navigate("/add-installation");
  };
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
    <div className="bg-image h-100" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: "500px", overflowY: "auto"}}>
      <div className="mask d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="card shadow-2-strong" style={{ backgroundColor: "#f5f7fa" }}>
                <div className="card-body">
      <h2>Installations</h2>
      
      <Button variant="primary" onClick={handleAddInstallationClick} className="mt-4 w-100" style={{ marginBottom: "10px" }}>
        Add New Installation
      </Button>
      <div className="table-responsive" style={{  width: "1000px", margin: "auto" }} >
       <Table striped bordered hover className="mb-0">
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
        <FontAwesomeIcon icon={faEdit} /> 
      </Button>{" "}
      <Button variant="secondary" onClick={handleCancelEdit}>
        <FontAwesomeIcon icon={faTimes} /> 
      </Button>
    </>
  ) : (
    <Button variant="primary" onClick={() => handleEditInstallation(installation)}>
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

export default InstallationScreen;
