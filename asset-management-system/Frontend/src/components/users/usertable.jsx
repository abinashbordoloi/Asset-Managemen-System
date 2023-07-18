import React, { useState, useEffect } from 'react';
import axios from "axios";


const UserTable = () => {

  const [users,setUser]=useState([])


  //deleteUser function
  const deleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/users/${id}`);
      setUser(users.filter((users) => users.id !== id));
    }
    catch (error) {
      console.error("Error deleting user:", error);
    }
  };



  useEffect(()=>{
   fetchUserData();
  },[])

const fetchUserData= async()=>{
    try {
      const response = await axios.get("http://localhost:5000/users");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
 

  return (
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
              <button className="btn btn-danger" onClick={() => deleteUser(user.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

}
export default UserTable;
