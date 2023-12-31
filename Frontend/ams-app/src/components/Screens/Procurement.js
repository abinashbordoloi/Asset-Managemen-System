import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import { Table, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash,faTimes } from "@fortawesome/free-solid-svg-icons";
import backgroundImage from "./tablebg.jpg";


const ProcurementScreen = () => {
  const navigate = useNavigate();
  const handleAddProcurementClick = () => {
    navigate("/add-procurement");
  };
  const [procurements, setProcurements] = useState([]);
  const [editingProcurement, setEditingProcurement] = useState(null);
  const [updatedProcurement, setUpdatedProcurement] = useState({
    procurement_id: "",
    supply_order_id: "",
    purchase_date: "",
    purchase_price: "",
    vendor_id: "",
    invoice_id: "",
    challan_id: "",
  });

  useEffect(() => {
    fetchProcurements();
  }, []);

  const fetchProcurements = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/public/Procurement"
      );
      setProcurements(response.data);
    } catch (error) {
      console.error("Error fetching procurements:", error);
    }
  };

  // Edit procurement
  const startEditing = (procurement) => {
    setEditingProcurement(procurement);
    setUpdatedProcurement({ ...procurement });
  };

  const cancelEditing = () => {
    setEditingProcurement(null);
    setUpdatedProcurement({
      procurement_id: "",
      supply_order_id: "",
      purchase_date: "",
      purchase_price: "",
      vendor_id: "",
      invoice_id: "",
      challan_id: "",
    });
  };

  const updateProcurement = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/public/Procurement/${editingProcurement.procurement_id}`,
        updatedProcurement
      );
      fetchProcurements();
      setEditingProcurement(null);
      setUpdatedProcurement({
        procurement_id: "",
        supply_order_id: "",
        purchase_date: "",
        purchase_price: "",
        vendor_id: "",
        invoice_id: "",
        challan_id: "",
      });
    } catch (error) {
      console.error("Error updating procurement:", error);
      alert("Failed to update procurement. Please try again later.");
    }
  };

  // Delete procurement
  const deleteProcurement = async (procurement_id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this procurement?");
      if (confirmed) {
        await axios.delete(`http://localhost:5000/api/public/Procurement/${procurement_id}`);
        fetchProcurements();
        alert("Procurement deleted successfully!");
      } else {
        alert("Procurement cannot be deleted. Invalid procurement ID or action canceled.");
      }
    } catch (error) {
      console.error("Error deleting procurement:", error);
      alert("Failed to delete procurement. Please try again later.");
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
      <h1>Procurements</h1>
      <Button variant="primary" onClick={handleAddProcurementClick} className="mt-4 w-100"  style={{ marginBottom: "10px" }}>
        Add Procurement
      </Button>
      <div className="table-responsive" style={{  width: "1000px", margin: "auto" }} >
       <Table striped bordered hover className="mb-0">
        <thead>
          <tr>
            <th>Procurement ID</th>
            <th>Supply Order ID</th>
            <th>Purchase Date</th>
            <th>Purchase Price</th>
            <th>Vendor ID</th>
            <th>Invoice ID</th>
            <th>Challan ID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {procurements.map((procurement) => (
            <tr key={procurement.procurement_id}>
              <td>
                {editingProcurement && editingProcurement.procurement_id === procurement.procurement_id ? (
                  <Form.Control
                    type="text"
                    value={updatedProcurement.procurement_id}
                    onChange={(e) =>
                      setUpdatedProcurement({
                        ...updatedProcurement,
                        procurement_id: e.target.value,
                      })
                    }
                  />
                ) : (
                  procurement.procurement_id
                )}
              </td>
              <td>
                {editingProcurement && editingProcurement.procurement_id === procurement.procurement_id ? (
                  <Form.Control
                    type="text"
                    value={updatedProcurement.supply_order_id}
                    onChange={(e) =>
                      setUpdatedProcurement({
                        ...updatedProcurement,
                        supply_order_id: e.target.value,
                      })
                    }
                  />
                ) : (
                  procurement.supply_order_id
                )}
              </td>
              <td>
                {editingProcurement && editingProcurement.procurement_id === procurement.procurement_id ? (
                  <Form.Control
                    type="date"
                    value={updatedProcurement.purchase_date}
                    onChange={(e) =>
                      setUpdatedProcurement({
                        ...updatedProcurement,
                        purchase_date: e.target.value,
                      })
                    }
                  />
                ) : (
                  procurement.purchase_date
                )}
              </td>
              <td>
                {editingProcurement && editingProcurement.procurement_id === procurement.procurement_id ? (
                  <Form.Control
                    type="number"
                    value={updatedProcurement.purchase_price}
                    onChange={(e) =>
                      setUpdatedProcurement({
                        ...updatedProcurement,
                        purchase_price: e.target.value,
                      })
                    }
                  />
                ) : (
                  procurement.purchase_price
                )}
              </td>
              <td>
                {editingProcurement && editingProcurement.procurement_id === procurement.procurement_id ? (
                  <Form.Control
                    type="text"
                    value={updatedProcurement.vendor_id}
                    onChange={(e) =>
                      setUpdatedProcurement({
                        ...updatedProcurement,
                        vendor_id: e.target.value,
                      })
                    }
                  />
                ) : (
                  procurement.vendor_id
                )}
              </td>
              <td>
                {editingProcurement && editingProcurement.procurement_id === procurement.procurement_id ? (
                  <Form.Control
                    type="text"
                    value={updatedProcurement.invoice_id}
                    onChange={(e) =>
                      setUpdatedProcurement({
                        ...updatedProcurement,
                        invoice_id: e.target.value,
                      })
                    }
                  />
                ) : (
                  procurement.invoice_id
                )}
              </td>
              <td>
                {editingProcurement && editingProcurement.procurement_id === procurement.procurement_id ? (
                  <Form.Control
                    type="text"
                    value={updatedProcurement.challan_id}
                    onChange={(e) =>
                      setUpdatedProcurement({
                        ...updatedProcurement,
                        challan_id: e.target.value,
                      })
                    }
                  />
                ) : (
                  procurement.challan_id
                )}
              </td>
              <td>
  {editingProcurement && editingProcurement.procurement_id === procurement.procurement_id ? (
    <>
      <Button variant="success" onClick={updateProcurement}>
        <FontAwesomeIcon icon={faEdit} /> 
      </Button>{" "}
      <Button variant="secondary" onClick={cancelEditing}>
        <FontAwesomeIcon icon={faTimes} /> 
      </Button>
    </>
  ) : (
    <>
      <Button variant="primary" onClick={() => startEditing(procurement)}>
        <FontAwesomeIcon icon={faEdit} /> 
      </Button>{" "}
      <Button variant="danger" onClick={() => deleteProcurement(procurement.procurement_id)}>
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

export default ProcurementScreen;
