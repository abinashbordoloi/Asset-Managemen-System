import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundImage from "./tablebg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faTimes } from "@fortawesome/free-solid-svg-icons";

const InvoiceScreen = () => {
  const navigate = useNavigate();
  const handleAddInvoiceClick = () => {
    navigate("/add-invoice");
  };
  const [invoices, setInvoices] = useState([]);
  const [editingInvoiceId, setEditingInvoiceId] = useState(null);
  const [editedInvoice, setEditedInvoice] = useState({
    invoice_details: "",
  });

  useEffect(() => {
    fetchInvoices();
  }, []);

  // Function to fetch invoices from the API
  const fetchInvoices = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/public/Invoice");
      setInvoices(response.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };

  // Function to start editing an invoice
  const handleEditInvoice = (invoice) => {
    setEditingInvoiceId(invoice.id);
    setEditedInvoice(invoice);
  };

  // Function to handle input change for edited invoice
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedInvoice((prevInvoice) => ({ ...prevInvoice, [name]: value }));
  };

  // Function to save changes for the edited invoice
  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/public/Invoice/${editingInvoiceId}`,
        editedInvoice
      );
      console.log("Invoice updated successfully!");
      setEditingInvoiceId(null);
      fetchInvoices();
    } catch (error) {
      console.error("Error updating invoice:", error);
    }
  };

  // Function to cancel editing an invoice
  const handleCancelEdit = () => {
    setEditingInvoiceId(null);
  };

  return (
    <div className="bg-image h-100" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="mask d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="card shadow-2-strong" style={{ backgroundColor: "#f5f7fa" }}>
                <div className="card-body">
      <h2>Invoices</h2>
      
      <Button variant="primary" onClick={handleAddInvoiceClick} className="mt-4 w-100" style={{ marginBottom: "10px" }}>
        Add New Invoice
      </Button>
      <div className="table-responsive" style={ {width:"900px"}}>
       <Table className="table table-striped table-bordered table-hover">
        <thead>
          <tr>
            <th>ID</th>
            <th>Invoice Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td>{invoice.id}</td>
              <td>
                {editingInvoiceId === invoice.id ? (
                  <Form.Control
                    as="textarea"
                    name="invoice_details"
                    value={editedInvoice.invoice_details}
                    onChange={handleInputChange}
                  />
                ) : (
                  invoice.invoice_details
                )}
              </td>
              <td>
                {editingInvoiceId === invoice.id ? (
                  <>
                    <Button variant="success" onClick={handleSaveChanges}>
                    <FontAwesomeIcon icon={faEdit} /> 
                    </Button>{" "}
                    <Button variant="secondary" onClick={handleCancelEdit}>
                    <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  </>
                ) : (
                  <Button variant="primary" onClick={() => handleEditInvoice(invoice)}>
                     <FontAwesomeIcon icon={faEdit} /> 
                  </Button>
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

export default InvoiceScreen;
