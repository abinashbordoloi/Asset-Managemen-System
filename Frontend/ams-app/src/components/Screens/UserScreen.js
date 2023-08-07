import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundImage from "./tablebg.jpg";

const UserScreen = () => {
  const navigate = useNavigate();
  const handleAddUserClick = () => {
    navigate("/add-user");
  };
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/public/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/public/users/${userId}`);
      console.log("User deleted successfully!");
      fetchUsers(); // Refresh the user list after deletion
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="bg-image h-100" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', height: "500px", overflowY: "auto"}}>
      <div className="mask d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="card shadow-2-strong" style={{ backgroundColor: "#f5f7fa" }}>
                <div className="card-body">
      <h2>Users</h2>

      <Button variant="primary" onClick={handleAddUserClick} className="mt-4 w-100" style={{ marginBottom: "10px" }}>
        Add New User
      </Button>
<div className="table-responsive" style={{  width: "900px", margin: "auto" }} >
       <Table striped bordered hover className="mb-0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Role</th>
            <th>Actions</th> {/* Add this column for delete buttons */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.role}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteUser(user.id)}>
                  Delete
                </Button>
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

export default UserScreen;
