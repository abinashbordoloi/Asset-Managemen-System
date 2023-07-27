import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const AddAssetScreen = () => {
  const [assetData, setAssetData] = useState({
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
    physicalStatus: "",
    asset_id: "",
    warranty_start_date: "",
    warranty_end_date: "",
  });

  const addAsset = async () => {
    try {
      await axios.post("http://localhost:5000/api/public/add-Asset", assetData);
      console.log("Asset added successfully!");
      alert("Asset added successfully!");
      setAssetData({
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
        physicalStatus: "",
        asset_id: "",
        warranty_start_date: "",
        warranty_end_date: "",
      });
    } catch (error) {
      console.error("Error adding asset:", error);
      alert("Failed to add asset.Location/category/procurement/installation/insurance/tagging Status/supply order/challan/physical status does not exist. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    setAssetData({ ...assetData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Asset</h2>

      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Description"
          name="description"
          value={assetData.description}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Serial Number"
          name="serial_no"
          value={assetData.serial_no}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Location"
          name="location"
          value={assetData.location}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Category"
          name="category"
          value={assetData.category}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Procurement"
          name="procurement"
          value={assetData.procurement}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Installation"
          name="installation"
          value={assetData.installation}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Insurance"
          name="insurance"
          value={assetData.insurance}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Warranty"
          name="warranty"
          value={assetData.warranty}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Tagging Status"
          name="tagging_status"
          value={assetData.tagging_status}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Remarks"
          name="remarks"
          value={assetData.remarks}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Supply Order"
          name="supplyOrder"
          value={assetData.supplyOrder}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Challan"
          name="challan"
          value={assetData.challan}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Physical Status"
          name="physicalStatus"
          value={assetData.physicalStatus}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Asset ID"
          name="asset_id"
          value={assetData.asset_id}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="date"
          placeholder="Warranty Start Date"
          name="warranty_start_date"
          value={assetData.warranty_start_date}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="date"
          placeholder="Warranty End Date"
          name="warranty_end_date"
          value={assetData.warranty_end_date}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button variant="primary" onClick={addAsset}>
        Add Asset
      </Button>
    </div>
  );
};

export default AddAssetScreen;
