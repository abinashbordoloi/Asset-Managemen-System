import React, { useState, useEffect } from 'react';
import axios from 'axios';


const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  const deleteUser = (id) => {
    axios.delete(`/users/${id}`).then(() => {
      setUsers(users.filter((user) => user.id !== id));
    });
  };

  return (
    <div>
      <h2>User List</h2>
      <table className="table table-striped">
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
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button className="btn btn-primary">Edit</button>
                <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserList;
