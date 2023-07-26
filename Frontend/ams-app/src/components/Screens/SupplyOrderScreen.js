import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const SupplyOrderScreen = () => {
  const [supplyOrders, setSupplyOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editedOrder, setEditedOrder] = useState({
    supply_order_no: "",
    supply_order_date: "",
    price: 0,
  });

  useEffect(() => {
    fetchSupplyOrders();
  }, []);
//to display supplyorder table
  const fetchSupplyOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/public/SupplyOrder");
      setSupplyOrders(response.data);
    } catch (error) {
      console.error("Error fetching supply orders:", error);
    }
  };

  //to edit and save supply order table
  const handleEditOrder = (order) => {
    setEditingOrderId(order.id);
    setEditedOrder(order);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/public/SupplyOrder/${editingOrderId}`,
        editedOrder
      );
      console.log("Supply order updated successfully!");
      setEditingOrderId(null); 
      fetchSupplyOrders(); 
    } catch (error) {
      console.error("Error updating supply order:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingOrderId(null); 
  };

  return (
    <div>
      <h2>Supply Orders</h2>
      <Button variant="primary" href="/add-location" style={{ marginBottom: "10px" }}>
        Add New Supply Order
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Supply Order No</th>
            <th>Supply Order Date</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {supplyOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                {editingOrderId === order.id ? (
                  <Form.Control
                    type="text"
                    name="supply_order_no"
                    value={editedOrder.supply_order_no}
                    onChange={handleInputChange}
                  />
                ) : (
                  order.supply_order_no
                )}
              </td>
              <td>
                {editingOrderId === order.id ? (
                  <Form.Control
                    type="date"
                    name="supply_order_date"
                    value={editedOrder.supply_order_date}
                    onChange={handleInputChange}
                  />
                ) : (
                  order.supply_order_date
                )}
              </td>
              <td>
                {editingOrderId === order.id ? (
                  <Form.Control
                    type="number"
                    name="price"
                    value={editedOrder.price}
                    onChange={handleInputChange}
                  />
                ) : (
                  order.price
                )}
              </td>
              <td>
                {editingOrderId === order.id ? (
                  <>
                    <Button variant="success" onClick={handleSaveChanges}>
                      Save
                    </Button>{" "}
                    <Button variant="secondary" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="primary" onClick={() => handleEditOrder(order)}>
                    Edit
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SupplyOrderScreen;
