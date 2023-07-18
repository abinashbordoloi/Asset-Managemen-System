import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ addUser }) => {
  const [id, setId] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/users/create', { id, username, email, password, role });
      addUser(response.data);
      setId('');
      setUsername('');
      setEmail('');
      setPassword('');
      setRole('');

      // Make a separate GET request to fetch the updated list of users
      const getUsersResponse = await axios.get('/users');
    //   const updatedUsers = getUsersResponse.data;
      // Update the list of users in the parent component or perform any necessary actions with the updated user list
      // addUserList(updatedUsers);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h1>Add User</h1>
      </div>
      <div className="form-group">
        <label htmlFor="id">ID</label>
        <input type="text" className="form-control" id="id" value={id} onChange={(e) => setId(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username</label>
        <input type="text" className="form-control" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password</label>
        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <div className="form-group">
        <label htmlFor="role">Role</label>
        <input type="text" className="form-control" id="role" value={role} onChange={(e) => setRole(e.target.value)} required />
      </div>
      <button type="submit" className="btn btn-primary">Add User</button>
    </form>
  );
};

export default UserForm;
