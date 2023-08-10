import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import backgroundImage from "./tablebg.jpg";

const DescriptionForm = () => {
  const [descriptionData, setDescriptionData] = useState({
    make: "",
    specification: "",
    model: "",
  });

  const addDescription = async () => {
    try {
      await axios.post("http://localhost:5000/api/public/add-Description", descriptionData);
      console.log("Description added successfully!");
      alert("Description added successfully!");
      setDescriptionData({
        make: "",
        specification: "",
        model: "",
      });
    } catch (error) {
      console.error("Error adding description:", error);
      alert("Failed to add description. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    setDescriptionData({ ...descriptionData, [e.target.name]: e.target.value });
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
      <h2>Add New Description</h2>
      <div className="form-responsive" style={{  width: "1000px", margin: "auto" }} >
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Make"
          name="make"
          value={descriptionData.make}
          onChange={handleInputChange}
          padding="10px"
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Specification"
          name="specification"
          value={descriptionData.specification}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Model"
          name="model"
          value={descriptionData.model}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button variant="primary" onClick={addDescription} > 
        Add Description
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

export default DescriptionForm;
