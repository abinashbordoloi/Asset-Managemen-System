import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './usersList';


import UserTable from './usertable';
import UserForm from './userform';
// import UserForm from './userform';
// import UserTable from './UserTable';
const UserPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/users');
      setUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>User Page</h2>
      <UserForm addUser={addUser} />
      <UserTable users={users} deleteUser={deleteUser} />
    </div>
  );
};

export default UserPage;

