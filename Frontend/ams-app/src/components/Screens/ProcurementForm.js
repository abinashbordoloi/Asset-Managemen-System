import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const ProcurementForm = () => {
  const [procurementData, setProcurementData] = useState({
    supply_order_id: "",
    purchase_date: "",
    purchase_price: "",
    vendor_id: "",
    invoice_id: "",
    challan_id: "",
  });

  const addProcurement = async () => {
    try {
      await axios.post("http://localhost:5000/api/public/add-Procurement", procurementData);
      console.log("Procurement added successfully!");
      alert("Procurement added successfully!");
      setProcurementData({
        supply_order_id: "",
        purchase_date: "",
        purchase_price: "",
        vendor_id: "",
        invoice_id: "",
        challan_id: "",
      });
    } catch (error) {
      console.error("Error adding procurement:", error);
      alert("Failed to add procurement. Supply_id/Invoice_id/Challan_id does not exist. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    setProcurementData({ ...procurementData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Procurement</h2>

      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Supply Order ID"
          name="supply_order_id"
          value={procurementData.supply_order_id}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="date"
          placeholder="Purchase Date"
          name="purchase_date"
          value={procurementData.purchase_date}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="number"
          placeholder="Purchase Price"
          name="purchase_price"
          value={procurementData.purchase_price}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Vendor ID"
          name="vendor_id"
          value={procurementData.vendor_id}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Invoice ID"
          name="invoice_id"
          value={procurementData.invoice_id}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Challan ID"
          name="challan_id"
          value={procurementData.challan_id}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button variant="primary" onClick={addProcurement}>
        Add Procurement
      </Button>
    </div>
  );
};

export default ProcurementForm;
