import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const SupplyOrderForm = () => {
  const [supplyOrderData, setSupplyOrderData] = useState({
    supply_order_no: "",
    supply_order_date: "",
    price: "",
  });

  const addSupplyOrder = async () => {
    try {
      await axios.post("http://localhost:5000/api/public/add-SupplyOrder", supplyOrderData);
      console.log("Supply Order added successfully!");
      alert("Supply Order added successfully!");
      setSupplyOrderData({
        supply_order_no: "",
        supply_order_date: "",
        price: "",
      });
    } catch (error) {
      console.error("Error adding Supply Order:", error);
      alert("Failed to add Supply Order. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    setSupplyOrderData({ ...supplyOrderData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Supply Order</h2>

      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Supply Order Number"
          name="supply_order_no"
          value={supplyOrderData.supply_order_no}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="date"
          name="supply_order_date"
          value={supplyOrderData.supply_order_date}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="number"
          step="0.01"
          placeholder="Price"
          name="price"
          value={supplyOrderData.price}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button variant="primary" onClick={addSupplyOrder}>
        Add Supply Order
      </Button>
    </div>
  );
};

export default SupplyOrderForm;
