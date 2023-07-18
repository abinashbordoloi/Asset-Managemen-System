import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Table, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
const API_ENDPOINT = "http://localhost:5000/users";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({
    username: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get(API_ENDPOINT);
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const startEditing = (user) => {
    setEditingUser(user);
    setUpdatedUser({ ...user });
  };

  const cancelEditing = () => {
    setEditingUser(null);
    setUpdatedUser({
      username: "",
      email: "",
      role: "",
    });
  };

  const updateUser = async () => {
    try {
      await axios.put(`${API_ENDPOINT}/${editingUser.id}`, updatedUser);
      fetchUsers();
      setEditingUser(null);
      setUpdatedUser({
        username: "",
        email: "",
        role: "",
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`${API_ENDPOINT}/${id}`);
      fetchUsers();
      alert("User deleted successfully!");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="container user-list-container">
      <h1 className="text-center mt-5">Users</h1>
      <div className="d-flex justify-content-center">
        <Link to="/users/create">
          <Button variant="primary my-3">Add User</Button>
        </Link>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <Form.Control
                    type="text"
                    value={updatedUser.username}
                    onChange={(e) =>
                      setUpdatedUser({ ...updatedUser, username: e.target.value })
                    }
                  />
                ) : (
                  user.id
                )}
              </td>
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <Form.Control
                    type="text"
                    value={updatedUser.email}
                    onChange={(e) =>
                      setUpdatedUser({ ...updatedUser, email: e.target.value })
                    }
                  />
                ) : (
                  user.email
                )}
              </td>
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <Form.Control
                    type="text"
                    value={updatedUser.role}
                    onChange={(e) =>
                      setUpdatedUser({ ...updatedUser, role: e.target.value })
                    }
                  />
                ) : (
                  user.role
                )}
              </td>
              <td>
                {editingUser && editingUser.id === user.id ? (
                  <Fragment>
                    <Button variant="success" onClick={updateUser}>
                      Save
                    </Button>{" "}
                    <Button variant="secondary" onClick={cancelEditing}>
                      Cancel
                    </Button>
                  </Fragment>
                ) : (
                  <Fragment>
                    <Button variant="primary" onClick={() => startEditing(user)}>
                      Edit
                    </Button>{" "}
                    <Button variant="danger" onClick={() => deleteUser(user.id)}>
                      Delete
                    </Button>
                  </Fragment>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserList;
