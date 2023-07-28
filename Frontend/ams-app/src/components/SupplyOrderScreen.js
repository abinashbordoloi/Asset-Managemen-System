import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const SupplyOrderScreen = () => {
  const [supplyOrders, setSupplyOrders] = useState([]);
  const [csvFile, setCsvFile] = useState(null);

  useEffect(() => {
    fetchSupplyOrders();
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setCsvFile(file);
  };

  const handleFileUpload = async () => {
    const formData = new FormData();
    formData.append("csvFile", csvFile);

    try {
      await axios.post(
        "http://localhost:5000/api/public/SupplyOrder",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("CSV data uploaded successfully!");
    } catch (error) {
      console.error("Error uploading CSV file:", error);
      alert("Failed to upload CSV data.");
    }
  };

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
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload CSV</button>
    </div>
  );
};

export default SupplyOrderScreen;
