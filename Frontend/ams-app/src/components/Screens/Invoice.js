import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const InvoiceScreen = () => {
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
    <div>
      <h2>Invoices</h2>
      
      <Button variant="primary" href="/add-invoice" style={{ marginBottom: "10px" }}>
        Add New Invoice
      </Button>

      <Table striped bordered hover>
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
                      Save
                    </Button>{" "}
                    <Button variant="secondary" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="primary" onClick={() => handleEditInvoice(invoice)}>
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

export default InvoiceScreen;
