import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const VendorScreen = () => {
  const [vendors, setVendors] = useState([]);
  const [editingVendorId, setEditingVendorId] = useState(null);
  const [editedVendor, setEditedVendor] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    country: "",
  });

  useEffect(() => {
    fetchVendors();
  }, []);

  // Function to fetch vendors from the API
  const fetchVendors = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/public/Vendor");
      setVendors(response.data);
    } catch (error) {
      console.error("Error fetching vendors:", error);
    }
  };

  // Function to start editing a vendor
  const handleEditVendor = (vendor) => {
    setEditingVendorId(vendor.id);
    setEditedVendor(vendor);
  };

  // Function to handle input change for edited vendor
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedVendor((prevVendor) => ({ ...prevVendor, [name]: value }));
  };

  // Function to save changes for the edited vendor
  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/public/Vendor/${editingVendorId}`,
        editedVendor
      );
      console.log("Vendor updated successfully!");
      setEditingVendorId(null);
      fetchVendors();
    } catch (error) {
      console.error("Error updating vendor:", error);
    }
  };

  // Function to cancel editing a vendor
  const handleCancelEdit = () => {
    setEditingVendorId(null);
  };

  return (
    <div>
      <h2>Vendors</h2>
      
      <Button variant="primary" href="/add-vendor" style={{ marginBottom: "10px" }}>
        Add New Vendor
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id}>
              <td>{vendor.id}</td>
              <td>
                {editingVendorId === vendor.id ? (
                  <Form.Control
                    type="text"
                    name="name"
                    value={editedVendor.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  vendor.name
                )}
              </td>
              <td>
                {editingVendorId === vendor.id ? (
                  <Form.Control
                    type="text"
                    name="address"
                    value={editedVendor.address}
                    onChange={handleInputChange}
                  />
                ) : (
                  vendor.address
                )}
              </td>
              <td>
                {editingVendorId === vendor.id ? (
                  <Form.Control
                    type="text"
                    name="city"
                    value={editedVendor.city}
                    onChange={handleInputChange}
                  />
                ) : (
                  vendor.city
                )}
              </td>
              <td>
                {editingVendorId === vendor.id ? (
                  <Form.Control
                    type="text"
                    name="state"
                    value={editedVendor.state}
                    onChange={handleInputChange}
                  />
                ) : (
                  vendor.state
                )}
              </td>
              <td>
                {editingVendorId === vendor.id ? (
                  <Form.Control
                    type="text"
                    name="country"
                    value={editedVendor.country}
                    onChange={handleInputChange}
                  />
                ) : (
                  vendor.country
                )}
              </td>
              <td>
                {editingVendorId === vendor.id ? (
                  <>
                    <Button variant="success" onClick={handleSaveChanges}>
                      Save
                    </Button>{" "}
                    <Button variant="secondary" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="primary" onClick={() => handleEditVendor(vendor)}>
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

export default VendorScreen;
