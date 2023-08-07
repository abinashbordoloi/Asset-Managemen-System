import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import backgroundImage from "./tablebg.jpg";

const InstallationForm = () => {
  const [installationData, setInstallationData] = useState({
    installation_date: "",
    commissioning_date: "",
  });

  const addInstallation = async () => {
    try {
      await axios.post("http://localhost:5000/api/public/add-Installation", installationData);
      console.log("Installation added successfully!");
      alert("Installation added successfully!");
      setInstallationData({
        installation_date: "",
        commissioning_date: "",
      });
    } catch (error) {
      console.error("Error adding installation:", error);
      alert("Failed to add installation. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    setInstallationData({ ...installationData, [e.target.name]: e.target.value });
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
              <div className="card shadow-2-strong" style={{ backgroundColor: "#d9d9d" }}>
                <div className="card-body">
      <h2>Add New Installation</h2>
      <div className="form-responsive" style={{  width: "1000px", margin: "auto" }} >
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="date"
          name="installation_date"
          value={installationData.installation_date}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="date"
          name="commissioning_date"
          value={installationData.commissioning_date}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button variant="primary" onClick={addInstallation}>
        Add Installation
      </Button>
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

export default InstallationForm;
