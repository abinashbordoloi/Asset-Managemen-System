import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundImage from "./tablebg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faTimes } from "@fortawesome/free-solid-svg-icons";

const SupplyOrderScreen = () => {
  const navigate = useNavigate();
  const handleAddSupplyOrderClick = () => {
    navigate("/add-supply-order");
  };
  const [supplyOrders, setSupplyOrders] = useState([]);
  const [editingOrderId, setEditingOrderId] = useState(null);
  const [editedOrder, setEditedOrder] = useState({
    supply_order_no: "",
    supply_order_date: "",
    price: 0,
  });

  useEffect(() => {
    fetchSupplyOrders();
  }, []);
//to display supplyorder table
  const fetchSupplyOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/public/SupplyOrder");
      setSupplyOrders(response.data);
    } catch (error) {
      console.error("Error fetching supply orders:", error);
    }
  };

  //to edit and save supply order table
  const handleEditOrder = (order) => {
    setEditingOrderId(order.id);
    setEditedOrder(order);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedOrder((prevOrder) => ({ ...prevOrder, [name]: value }));
  };

  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/public/SupplyOrder/${editingOrderId}`,
        editedOrder
      );
      console.log("Supply order updated successfully!");
      setEditingOrderId(null); 
      fetchSupplyOrders(); 
    } catch (error) {
      console.error("Error updating supply order:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingOrderId(null); 
  };

  return (
    <div className="bg-image h-100" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center'}}>
      <div className="mask d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="card shadow-2-strong" style={{ backgroundColor: "#f5f7fa" }}>
                <div className="card-body">
      <h2>Supply Orders</h2>
      <Button variant="primary" onClick={handleAddSupplyOrderClick} className="mt-4 w-100" style={{ marginBottom: "10px" }}>
        Add New Supply Order
      </Button>
      <div className="table-responsive" style={{  width: "900px", margin: "auto" }} >
       <Table striped bordered hover className="mb-0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Supply Order No</th>
            <th>Supply Order Date</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {supplyOrders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                {editingOrderId === order.id ? (
                  <Form.Control
                    type="text"
                    name="supply_order_no"
                    value={editedOrder.supply_order_no}
                    onChange={handleInputChange}
                  />
                ) : (
                  order.supply_order_no
                )}
              </td>
              <td>
                {editingOrderId === order.id ? (
                  <Form.Control
                    type="date"
                    name="supply_order_date"
                    value={editedOrder.supply_order_date}
                    onChange={handleInputChange}
                  />
                ) : (
                  order.supply_order_date
                )}
              </td>
              <td>
                {editingOrderId === order.id ? (
                  <Form.Control
                    type="number"
                    name="price"
                    value={editedOrder.price}
                    onChange={handleInputChange}
                  />
                ) : (
                  order.price
                )}
              </td>
              <td>
                {editingOrderId === order.id ? (
                  <>
                    <Button variant="success" onClick={handleSaveChanges}>
                    <FontAwesomeIcon icon={faEdit} /> 
                    </Button>{" "}
                    <Button variant="secondary" onClick={handleCancelEdit}>
                    <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  </>
                ) : (
                  <Button variant="primary" onClick={() => handleEditOrder(order)}>
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

export default SupplyOrderScreen;
