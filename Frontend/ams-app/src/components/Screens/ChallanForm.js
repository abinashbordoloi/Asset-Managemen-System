import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import backgroundImage from "./tablebg.jpg";

const ChallanForm = () => {
  const [challanData, setChallanData] = useState({
    challan_details: "",
  });

  const addChallan = async () => {
    try {
      await axios.post("http://localhost:5000/api/public/add-Challan", challanData);
      console.log("Challan added successfully!");
      alert("Challan added successfully!");
      setChallanData({
        challan_details: "",
      });
    } catch (error) {
      console.error("Error adding challan:", error);
      alert("Failed to add challan. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    setChallanData({ ...challanData, [e.target.name]: e.target.value });
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
      <h2>Add New Challan</h2>
 <div className="form-responsive" style={{ width: "1000px", margin: "auto" }} ></div>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          as="textarea"
          rows={4}
          placeholder="Challan Details"
          name="challan_details"
          value={challanData.challan_details}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button variant="primary" onClick={addChallan}>
        Add Challan
      </Button>
    </div>
    </div>
    </div>
               </div>
             </div>
           </div>
          </div>
      

  );
};

export default ChallanForm;
