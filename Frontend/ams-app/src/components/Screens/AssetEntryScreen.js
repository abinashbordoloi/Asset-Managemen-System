import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash,faTimes } from "@fortawesome/free-solid-svg-icons";
import backgroundImage from "./tablebg.jpg";
const AssetEntryScreen = () => {
  const navigate = useNavigate();

  const handleAddAssetClick = () => {
    navigate("/add-asset");
  };
  const [assets, setAssets] = useState([]);
  const [editingAsset, setEditingAsset] = useState(null);
  const [updatedAsset, setUpdatedAsset] = useState({
    id: "",
    description: "",
    serial_no: "",
    location: "",
    category: "",
    procurement: "",
    installation: "",
    insurance: "",
    // warranty: "",
    tagging_status: "",
    remarks: "",
    supplyOrder: "",
    challan: "",
    physicalStatus: "",
    asset_id: "",
    waranty_start_date: "",
    warranty_end_date: "",
  });

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/public/Asset");
      setAssets(response.data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  // Edit asset
  const startEditing = (asset) => {
    setEditingAsset(asset);
    setUpdatedAsset({ ...asset });
  };

  const cancelEditing = () => {
    setEditingAsset(null);
    setUpdatedAsset({
      id: "",
      description: "",
      serial_no: "",
      location: "",
      category: "",
      procurement: "",
      installation: "",
      insurance: "",
      // warranty: "",
      tagging_status: "",
      remarks: "",
      supplyOrder: "",
      challan: "",
      physicalStatus: "",
      asset_id: "",
      waranty_start_date: "",
      warranty_end_date: "",
    });
  };

  const updateAsset = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/public/Asset/${editingAsset.id}`,
        updatedAsset
      );
      fetchAssets();
      setEditingAsset(null);
      setUpdatedAsset({
        id: "",
        description: "",
        serial_no: "",
        location: "",
        category: "",
        procurement: "",
        installation: "",
        insurance: "",
        // warranty: "",
        tagging_status: "",
        remarks: "",
        supplyOrder: "",
        challan: "",
        physicalStatus: "",
        asset_id: "",
        waranty_start_date: "",
        warranty_end_date: "",
      });
    } catch (error) {
      console.error("Error updating asset:", error);
      alert("Failed to update asset. Please try again later.");
    }
  };

  // Delete asset
  const deleteAsset = async (asset_id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this asset?");
      if (confirmed) {
        await axios.delete(`http://localhost:5000/api/public/Asset/${asset_id}`);
        fetchAssets();
        alert("Asset deleted successfully!");
      } else {
        alert("Asset cannot be deleted. Invalid asset ID or action canceled.");
      }
    } catch (error) {
      console.error("Error deleting asset:", error);
      alert("Failed to delete asset. Please try again later.");
    }
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
                <div className="card shadow-2-strong" style={{ backgroundColor: "#f5f7fa" }}>
                  <div className="card-body">
      <h1>Asset Entry</h1>
      
      <Button variant="primary" onClick={handleAddAssetClick} className="mt-4 w-100" style={{ marginBottom: "10px" }}>
        Add New Asset
      </Button>
      <div className="table-responsive" style={{  width: "2000px", margin: "auto" }} >
       <Table striped bordered hover className="mb-0">
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
            {/* <th>Warranty</th> */}
            <th>Tagging Status</th>
            <th>Remarks</th>
            <th>Supply Order</th>
            <th>Challan</th>
            <th>Physical Status</th>
            <th>Asset ID</th>
            <th>Warranty Start Date</th>
            <th>Warranty End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.id}>
              <td>
                {editingAsset && editingAsset.id === asset.id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.id}
                    onChange={(e) => setUpdatedAsset({ ...updatedAsset, id: e.target.value })}
                  />
                ) : (
                  asset.id
                )}
              </td>
              <td>
                {editingAsset && editingAsset.id === asset.id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.description}
                    onChange={(e) => setUpdatedAsset({ ...updatedAsset, description: e.target.value })}
                  />
                ) : (
                  asset.description
                )}
              </td>
              <td>
                {editingAsset && editingAsset.id === asset.id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.serial_no}
                    onChange={(e) => setUpdatedAsset({ ...updatedAsset, serial_no: e.target.value })}
                  />
                ) : (
                  asset.serial_no
                )}
              </td>
              <td>
                {editingAsset && editingAsset.id === asset.id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.location}
                    onChange={(e) => setUpdatedAsset({ ...updatedAsset, location: e.target.value })}
                  />
                ) : (
                  asset.location
                )}
              </td>
              <td>
                {editingAsset && editingAsset.id === asset.id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.category}
                    onChange={(e) => setUpdatedAsset({ ...updatedAsset, category: e.target.value })}
                  />
                ) : (
                  asset.category
                )}
              </td>
              <td>
                {editingAsset && editingAsset.id === asset.id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.procurement}
                    onChange={(e) => setUpdatedAsset({ ...updatedAsset, procurement: e.target.value })}
                  />
                ) : (
                  asset.procurement
                )}
              </td>
              <td>
                {editingAsset && editingAsset.id === asset.id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.installation}
                    onChange={(e) => setUpdatedAsset({ ...updatedAsset, installation: e.target.value })}
                  />
                ) : (
                  asset.installation
                )}
              </td>
              <td>
                {editingAsset && editingAsset.id === asset.id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.insurance}
                    onChange={(e) => setUpdatedAsset({ ...updatedAsset, insurance: e.target.value })}
                  />
                ) : (
                  asset.insurance
                )}
              </td>
              {/* <td>
                {editingAsset && editingAsset.id === asset.id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.warranty}
                    onChange={(e) => setUpdatedAsset({ ...updatedAsset, warranty: e.target.value })}
                  />
                ) : (
                  asset.warranty
                )}
              </td> */}
              <td>
                {editingAsset && editingAsset.id === asset.id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.tagging_status}
                    onChange={(e) => setUpdatedAsset({ ...updatedAsset, tagging_status: e.target.value })}
                  />
                ) : (
                  asset.tagging_status
                )}
              </td>
              <td>
                {editingAsset && editingAsset.id === asset.id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.remarks}
                    onChange={(e) => setUpdatedAsset({ ...updatedAsset, remarks: e.target.value })}
                  />
                ) : (
                  asset.remarks
                )}
              </td>
              <td>
                {editingAsset && editingAsset.id === asset.id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.supplyOrder}
                    onChange={(e) => setUpdatedAsset({ ...updatedAsset, supplyOrder: e.target.value })}
                  />
                ) : (
                  asset.supplyOrder
                )}
              </td>
              <td>
                {editingAsset && editingAsset.id === asset.id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.challan}
                    onChange={(e) => setUpdatedAsset({ ...updatedAsset, challan: e.target.value })}
                  />
                ) : (
                  asset.challan
                )}
              </td>
              <td>
                {editingAsset && editingAsset.id === asset.id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.physicalStatus}
                    onChange={(e) => setUpdatedAsset({ ...updatedAsset, physicalStatus: e.target.value })}
                  />
                ) : (
                  asset.physicalStatus
                )}
              </td>
              <td>
                {editingAsset && editingAsset.id === asset.id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.asset_id}
                    onChange={(e) => setUpdatedAsset({ ...updatedAsset, asset_id: e.target.value })}
                  />
                ) : (
                  asset.asset_id
                )}
              </td>
              <td>
                {editingAsset && editingAsset.id === asset.id ? (
                  <Form.Control
                    type="date"
                    value={updatedAsset.waranty_start_date}
                    onChange={(e) => setUpdatedAsset({ ...updatedAsset, waranty_start_date: e.target.value })}
                  />
                ) : (
                  asset.waranty_start_date
                )}
              </td>
              <td>
                {editingAsset && editingAsset.id === asset.id ? (
                  <Form.Control
                    type="date"
                    value={updatedAsset.warranty_end_date}
                    onChange={(e) => setUpdatedAsset({ ...updatedAsset, warranty_end_date: e.target.value })}
                  />
                ) : (
                  asset.warranty_end_date
                )}
              </td>
              <td>
  {editingAsset && editingAsset.id === asset.id ? (
    <>
      <Button variant="success" onClick={updateAsset}>
        <FontAwesomeIcon icon={faEdit} /> 
      </Button>{" "}
      <Button variant="secondary" onClick={cancelEditing}>
        <FontAwesomeIcon icon={faTimes} /> 
      </Button>
    </>
  ) : (
    <>
      <Button variant="primary" onClick={() => startEditing(asset)}>
        <FontAwesomeIcon icon={faEdit} /> 
      </Button>{" "}
      <Button variant="danger" onClick={() => deleteAsset(asset.id)}>
        <FontAwesomeIcon icon={faTrash} />
      </Button>
    </>
  )}
</td>
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

export default AssetEntryScreen;
