import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const SupplyOrderScreen = () => {
  const [supplyOrders, setSupplyOrders] = useState([]);

  useEffect(() => {
    fetchSupplyOrders();
  }, []);

  const fetchSupplyOrders = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/public/SupplyOrder"
      );
      setSupplyOrders(response.data);
    } catch (error) {
      console.error("Error fetching supply orders:", error);
    }
  };

  return (
    <div>
      <h2>Supply Orders</h2>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Supply Order No</th>
            <th>Supply Order Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {supplyOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.supply_order_no}</td>
              <td>{order.supply_order_date}</td>
              <td>{order.price}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SupplyOrderScreen;
