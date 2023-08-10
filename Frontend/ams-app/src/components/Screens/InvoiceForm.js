import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import backgroundImage from "./tablebg.jpg";

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
      <h2>Add New Invoice</h2>
      <div className="form-responsive" style={{ width: "1000px", margin: "auto" }} >
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
    </div>
    </div>
               </div>
             </div>
           </div>
           </div>
           </div>
  );
};

export default InvoiceForm;
