import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";

const AssetView = () => {
  const [assets, setAssets] = useState([]);
  const [procurements, setProcurements] = useState([]);

  useEffect(() => {
    fetchAssets();
    fetchProcurements();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/public/assets");
      setAssets(response.data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  const fetchProcurements = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/public/procurements");
      setProcurements(response.data);
    } catch (error) {
      console.error("Error fetching procurements:", error);
    }
  };

  return (
    <div
    className="bg-image h-100"
    style={{
      background: "#b0c6e4",
      height: "500px",
      overflowY: "auto",
    }}
  >
      <div className="mask d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div
                className="card shadow-2-strong"
                style={{ backgroundColor: "#a5aab0a", marginBottom: "20px" }}
              >
                <div className="card-body">
                  <h1>Asset Entry</h1>

                  <div className="table-responsive" style={{ width: "1900px", margin: "auto" }}>
                    <Table striped bordered hover className="mb-0">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Description</th>
                          <th>Serial No</th>
                          <th>Location</th>
                          <th>Category</th>
                          <th>Procurement</th>
                          <th>Installation Date</th>
                          <th>Commissioning Date</th>
                          <th>Insurance Company</th>
                          {/* <th>Warranty</th> */}
                          <th>Tagging Status</th>
                          <th>Remarks</th>
                          <th>Supply Order Price</th>
                          {/* <th>Challan</th> */}
                          <th>Physical Status</th>
                          <th>Asset ID</th>
                          <th>Warranty Start Date</th>
                          <th>Warranty End Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {assets.map((asset) => (
                          <tr key={asset.asset_id}>
                            <td>{asset.asset_id}</td>
                            <td>{asset.description}</td>
                            <td>{asset.serial_no}</td>
                            <td>{asset.location}</td>
                            <td>{asset.category}</td>
                            <td>{asset.procurement}</td>
                            <td>{asset.installation_date}</td>
                            <td>{asset.commissioning_date}</td>
                            <td>{asset.insurance_company}</td>
                            {/* <td>{asset.warranty}</td> */}
                            <td>{asset.tagging_status}</td> 
                            <td>{asset.remarks}</td>
                            <td>{asset.supplyorder_price}</td>
                            {/* <td>{asset.challan_details}</td> */}
                            <td>{asset.physicalStatus}</td>
                            <td>{asset.asset_id}</td>
                            <td>{asset.waranty_start_date}</td>
                            <td>{asset.warranty_end_date}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mask d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div
                className="card shadow-2-strong"
                style={{ backgroundColor: "#a5aab0a" }}
              >
                <div className="card-body">
                  <h1>Procurement Entry</h1>

                  <div
                    className="table-responsive"
                    style={{ width: "1900px", margin: "auto" }}
                  >
                    <Table striped bordered hover className="mb-0">
                      <thead>
                        <tr>
                          <th>Procurement ID</th>
                          <th>Supply Order ID</th>
                          <th>Purchase Date</th>
                          <th>Purchase Price</th>
                          <th>Vendor Name</th>
                          <th>Invoice Details</th>
                          <th>Challan Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        {procurements.map((procurement) => (
                          <tr key={procurement.procurement_id}>
                            <td>{procurement.procurement_id}</td>
                            <td>{procurement.supply_order_id}</td>
                            <td>{procurement.purchase_date}</td>
                            <td>{procurement.purchase_price}</td>
                            <td>{procurement.vendor_name}</td>
                            <td>{procurement.invoice_details}</td>
                            <td>{procurement.challan_details}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
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

export default AssetView;
