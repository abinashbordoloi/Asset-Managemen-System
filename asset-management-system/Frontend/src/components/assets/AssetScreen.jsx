import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const AddAssetScreen = () => {
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

  const addAsset = async () => {
    try {
      await axios.post("http://localhost:5000/Assets", newAsset);
      // Add your desired logic after adding the asset
      console.log("Asset added successfully!");
      // Reset the form fields
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

  const handleInputChange = (e) => {
    setNewAsset({ ...newAsset, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <h2>Add New Asset</h2>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Asset ID"
          name="asset_id"
          value={newAsset.asset_id}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Description"
          name="description"
          value={newAsset.description}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Serial No"
          name="serial_no"
          value={newAsset.serial_no}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Location"
          name="location"
          value={newAsset.location}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Category"
          name="category"
          value={newAsset.category}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Procurement"
          name="procurement"
          value={newAsset.procurement}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Installation"
          name="installation"
          value={newAsset.installation}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Insurance"
          name="insurance"
          value={newAsset.insurance}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Warranty"
          name="warranty"
          value={newAsset.warranty}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Tagging Status"
          name="tagging_status"
          value={newAsset.tagging_status}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Remarks"
          name="remarks"
          value={newAsset.remarks}
          onChange={handleInputChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Supply Order"
          name="supplyOrder"
          value={newAsset.supplyOrder}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Control
          type="text"
          placeholder="Challan"
          name="challan"
          value={newAsset.challan}
          onChange={handleInputChange}
        />
      </Form.Group>


      
      <Button variant="primary" onClick={addAsset}>
        Add Asset
      </Button>
      
    </div>
  );
};

export default AddAssetScreen;