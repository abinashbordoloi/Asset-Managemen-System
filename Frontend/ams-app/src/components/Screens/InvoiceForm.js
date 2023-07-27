import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const InvoiceForm = () => {
  const [invoiceData, setInvoiceData] = useState({
    invoice_details: "",
  });

  const addInvoice = async () => {
    try {
      await axios.post("http://localhost:5000/api/public/add-Invoice", invoiceData);
      console.log("Invoice added successfully!");
      alert("Invoice added successfully!");
      setInvoiceData({
        invoice_details: "",
      });
    } catch (error) {
      console.error("Error adding invoice:", error);
      alert("Failed to add invoice. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    setInvoiceData({ ...invoiceData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Invoice</h2>

      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          as="textarea"
          placeholder="Invoice Details"
          name="invoice_details"
          value={invoiceData.invoice_details}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button variant="primary" onClick={addInvoice}>
        Add Invoice
      </Button>
    </div>
  );
};

export default InvoiceForm;
