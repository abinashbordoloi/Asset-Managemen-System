import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import { Pie } from "react-chartjs-2";

const AssetView = () => {
  const [assets, setAssets] = useState([]);
  const [pieData, setPieData] = useState({});

  useEffect(() => {
    const fetchAssets = async () => {
      try {
        const response = await axios.get("YOUR_API_ENDPOINT"); // Replace with your API endpoint
        setAssets(response.data);
      } catch (error) {
        console.error("Error fetching asset data:", error);
      }
    };
    fetchAssets();
  }, []);

  useEffect(() => {
    const generatePieChartData = () => {
      const servicibleCount = assets.filter((asset) => asset.physicalStatus === "Serviceable").length;
      const nonServicibleCount = assets.filter((asset) => asset.physicalStatus === "Non-Serviceable").length;

      return {
        labels: ["Serviceable", "Non-Serviceable"],
        datasets: [
          {
            data: [servicibleCount, nonServicibleCount],
            backgroundColor: ["#36A2EB", "#FF6384"],
          },
        ],
      };
    };

    setPieData(generatePieChartData());
  }, [assets]);

  return (
    <div>
      <div className="pie-chart-section">
        <h2>Pie Chart: Asset Physical Status</h2>
        {assets.length > 0 && <Pie data={pieData} />}
      </div>
      <div className="table-section">
        <h2>Asset Table</h2>
        {assets.length > 0 && (
          <Table striped bordered hover>
            <thead>
              <tr>
              <th>ID</th>
            <th>Description</th>
            <th>Serial No</th>
            <th>Location</th>
            <th>Category</th>
            <th>Procurement</th>
            <th>Installation</th>
            <th>Insurance</th>
            <th>Warranty</th>
            <th>Tagging Status</th>
            <th>Remarks</th>
            <th>Supply Order</th>
            <th>Challan</th>
            <th>Physical Status</th>
            <th>Asset ID</th>
            <th>Warranty Start Date</th>
            <th>Warranty End Date</th>
              </tr>
            </thead>
            <tbody>
              {assets.map((asset) => (
                <tr key={asset.id}>
                  <td>{asset.id}</td>
                  <td>{asset.description}</td>
                  <td>{asset.serial_no}</td>
                  <td>{asset.location}</td>
                  <td>{asset.category}</td>
                  <td>{asset.procurement}</td>
                  <td>{asset.installation}</td>
                  <td>{asset.insurance}</td>
                  <td>{asset.warranty}</td>
                  <td>{asset.tagging_status}</td>
                  <td>{asset.remarks}</td>
                  <td>{asset.supply_order}</td>
                  <td>{asset.challan}</td>
                  <td>{asset.physicalStatus}</td>
                  <td>{asset.asset_id}</td>
                  <td>{asset.warranty_start_date}</td>
                  
                  {/* Add more table cells for other columns as needed */}
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default AssetView;
