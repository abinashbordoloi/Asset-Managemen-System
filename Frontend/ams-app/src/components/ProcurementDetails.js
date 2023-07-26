import React, { useState, useEffect } from "react";
import axios from "axios";

const ProcurementDetails = () => {
  const [procurements, setProcurements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch procurement details from the server
    axios
      .get("http://localhost:5000/api/public/Procurement")
      .then((response) => {
        setProcurements(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Failed to fetch procurement details.", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Procurement Details</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Procurement ID</th>
            <th>Supply Order ID</th>
            <th>Purchase Date</th>
            <th>Purchase Price</th>
            <th>Vendor Price</th>
            <th>Invoice ID</th>
            <th>Challan ID</th>
          </tr>
        </thead>
        <tbody>
          {procurements.map((procurement) => (
            <tr key={procurement.procurement_id}>
              <td>{procurement.procurement_id}</td>
              <td>{procurement.supply_order_id}</td>
              <td>{procurement.purchase_date}</td>
              <td>{procurement.purchase_price}</td>
              <td>{procurement.vendor_price}</td>
              <td>{procurement.invoice_id}</td>
              <td>{procurement.challan_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProcurementDetails;
