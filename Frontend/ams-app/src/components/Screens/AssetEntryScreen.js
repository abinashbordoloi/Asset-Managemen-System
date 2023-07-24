import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const AssetEntryScreen = () => {
  const [assets, setAssets] = useState([]);
  const [newAsset, setNewAsset] = useState({
    asset_id: "",
    description: "",
    serial_no: "",
    location: "",
    category: "",
    procurement: "",
    installation: "",
    insurance: "",
    warranty: "",
    tagging_status: "",
    remarks: "",
    supplyOrder: "",
    challan: "",
  });
  const [editingAsset, setEditingAsset] = useState(null);
  const [updatedAsset, setUpdatedAsset] = useState({
    asset_id: "",
    description: "",
    serial_no: "",
    location: "",
    category: "",
    procurement: "",
    installation: "",
    insurance: "",
    warranty: "",
    tagging_status: "",
    remarks: "",
    supplyOrder: "",
    challan: "",
  });

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/public/Asset"
      );
      setAssets(response.data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  const addAsset = async () => {
    try {
      await axios.post("http://localhost:5000/api/public/Asset", newAsset);
      fetchAssets();
      setNewAsset({
        asset_id: "",
        description: "",
        serial_no: "",
        location: "",
        category: "",
        procurement: "",
        installation: "",
        insurance: "",
        warranty: "",
        tagging_status: "",
        remarks: "",
        supplyOrder: "",
        challan: "",
      });
    } catch (error) {
      console.error("Error adding asset:", error);
    }
  };

  const startEditing = (asset) => {
    setEditingAsset(asset);
    setUpdatedAsset({ ...asset });
  };

  const cancelEditing = () => {
    setEditingAsset(null);
    setUpdatedAsset({
      asset_id: "",
      description: "",
      serial_no: "",
      location: "",
      category: "",
      procurement: "",
      installation: "",
      insurance: "",
      warranty: "",
      tagging_status: "",
      remarks: "",
      supplyOrder: "",
      challan: "",
    });
  };

  const updateAsset = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/public/Asset/${editingAsset.asset_id}`,
        updatedAsset
      );
      fetchAssets();
      setEditingAsset(null);
      setUpdatedAsset({
        asset_id: "",
        description: "",
        serial_no: "",
        location: "",
        category: "",
        procurement: "",
        installation: "",
        insurance: "",
        warranty: "",
        tagging_status: "",
        remarks: "",
        supplyOrder: "",
        challan: "",
      });
    } catch (error) {
      console.error("Error updating asset:", error);
    }
  };


  //delete asset
  const deleteAsset = async (asset_id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this asset?");
      if (confirmed) {
        console.log("kuch toh hua hai ");
        await axios.delete(`http://localhost:5000/api/public/Assetdelete/${asset_id}`);
        // await axios.delete(`http://localhost:5000/api/public/Assetdelete/${asset_id}`);
        console.log("kuch toh hua hai 2  ");
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
    <div>
      <h1>Assets</h1>
      <Link to="/add-asset">
        <Button variant="primary">Add New Asset</Button>
      </Link>

      

      {/* Table is starting here */}
     

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Asset ID</th>
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset) => (
            <tr key={asset.asset_id}>
              <td>
                {editingAsset && editingAsset.asset_id === asset.asset_id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.asset_id}
                    onChange={(e) =>
                      setUpdatedAsset({
                        ...updatedAsset,
                        asset_id: e.target.value,
                      })
                    }
                  />
                ) : (
                  asset.asset_id
                )}
              </td>
              <td>
                {editingAsset && editingAsset.asset_id === asset.asset_id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.description}
                    onChange={(e) =>
                      setUpdatedAsset({
                        ...updatedAsset,
                        description: e.target.value,
                      })
                    }
                  />
                ) : (
                  asset.description
                )}
              </td>
              <td>
                {editingAsset && editingAsset.asset_id === asset.asset_id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.serial_no}
                    onChange={(e) =>
                      setUpdatedAsset({
                        ...updatedAsset,
                        serial_no: e.target.value,
                      })
                    }
                  />
                ) : (
                  asset.serial_no
                )}
              </td>
              <td>
                {editingAsset && editingAsset.asset_id === asset.asset_id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.location}
                    onChange={(e) =>
                      setUpdatedAsset({
                        ...updatedAsset,
                        location: e.target.value,
                      })
                    }
                  />
                ) : (
                  asset.location
                )}
              </td>
              <td>
                {editingAsset && editingAsset.asset_id === asset.asset_id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.category}
                    onChange={(e) =>
                      setUpdatedAsset({
                        ...updatedAsset,
                        category: e.target.value,
                      })
                    }
                  />
                ) : (
                  asset.category
                )}
              </td>
              <td>
                {editingAsset && editingAsset.asset_id === asset.asset_id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.procurement}
                    onChange={(e) =>
                      setUpdatedAsset({
                        ...updatedAsset,
                        procurement: e.target.value,
                      })
                    }
                  />
                ) : (
                  asset.procurement
                )}
              </td>
              <td>
                {editingAsset && editingAsset.asset_id === asset.asset_id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.installation}
                    onChange={(e) =>
                      setUpdatedAsset({
                        ...updatedAsset,
                        installation: e.target.value,
                      })
                    }
                  />
                ) : (
                  asset.installation
                )}
              </td>
              <td>
                {editingAsset && editingAsset.asset_id === asset.asset_id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.insurance}
                    onChange={(e) =>
                      setUpdatedAsset({
                        ...updatedAsset,
                        insurance: e.target.value,
                      })
                    }
                  />
                ) : (
                  asset.insurance
                )}
              </td>
              <td>
                {editingAsset && editingAsset.asset_id === asset.asset_id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.warranty}
                    onChange={(e) =>
                      setUpdatedAsset({
                        ...updatedAsset,
                        warranty: e.target.value,
                      })
                    }
                  />
                ) : (
                  asset.warranty
                )}
              </td>
              <td>
                {editingAsset && editingAsset.asset_id === asset.asset_id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.tagging_status}
                    onChange={(e) =>
                      setUpdatedAsset({
                        ...updatedAsset,
                        tagging_status: e.target.value,
                      })
                    }
                  />
                ) : (
                  asset.tagging_status
                )}
              </td>
              <td>
                {editingAsset && editingAsset.asset_id === asset.asset_id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.remarks}
                    onChange={(e) =>
                      setUpdatedAsset({
                        ...updatedAsset,
                        remarks: e.target.value,
                      })
                    }
                  />
                ) : (
                  asset.remarks
                )}
              </td>
              <td>
                {editingAsset && editingAsset.asset_id === asset.asset_id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.supplyOrder}
                    onChange={(e) =>
                      setUpdatedAsset({
                        ...updatedAsset,
                        supplyOrder: e.target.value,
                      })
                    }
                  />
                ) : (
                  asset.supplyOrder
                )}
              </td>
              <td>
                {editingAsset && editingAsset.asset_id === asset.asset_id ? (
                  <Form.Control
                    type="text"
                    value={updatedAsset.challan}
                    onChange={(e) =>
                      setUpdatedAsset({
                        ...updatedAsset,
                        challan: e.target.value,
                      })
                    }
                  />
                ) : (
                  asset.challan
                )}
              </td>
              <td>
                {editingAsset && editingAsset.asset_id === asset.asset_id ? (
                  <>
                    <Button variant="success" onClick={updateAsset}>
                      Save
                    </Button>{" "}
                    <Button variant="secondary" onClick={cancelEditing}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant="primary"
                      onClick={() => startEditing(asset)}
                    >
                      Edit
                    </Button>{" "}
                    <Button variant="danger"
                      onClick={() => deleteAsset(asset.asset_id)}>Delete
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AssetEntryScreen;
