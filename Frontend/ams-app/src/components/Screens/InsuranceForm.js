import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const InsuranceForm = () => {
  const [insuranceData, setInsuranceData] = useState({
    start_date: "",
    end_date: "",
    insurance_company: "",
    insurance_no: "",
    insurance_period: "",
  });

  const addInsurance = async () => {
    try {
      await axios.post("http://localhost:5000/api/public/add-Insurance", insuranceData);
      console.log("Insurance added successfully!");
      alert("Insurance added successfully!");
      setInsuranceData({
        start_date: "",
        end_date: "",
        insurance_company: "",
        insurance_no: "",
        insurance_period: "",
      });
    } catch (error) {
      console.error("Error adding insurance:", error);
      alert("Failed to add insurance. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    setInsuranceData({ ...insuranceData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Insurance</h2>

      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="date"
          placeholder="Start Date"
          name="start_date"
          value={insuranceData.start_date}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="date"
          placeholder="End Date"
          name="end_date"
          value={insuranceData.end_date}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Insurance Company"
          name="insurance_company"
          value={insuranceData.insurance_company}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Insurance No"
          name="insurance_no"
          value={insuranceData.insurance_no}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Insurance Period"
          name="insurance_period"
          value={insuranceData.insurance_period}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button variant="primary" onClick={addInsurance}>
        Add Insurance
      </Button>
    </div>
  );
};

export default InsuranceForm;
