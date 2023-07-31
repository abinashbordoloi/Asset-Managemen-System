// import React, { useState } from "react";
// import axios from "axios";
// import { Form, Button } from "react-bootstrap";
// import { hashPassword } from "./hashPassword";



// const UserForm = () => {

    
//   const [userData, setUserData] = useState({
//     username: "",
//     password: "",
//     confirmPassword: "",
//     role: "",
//   });

//   const addUser = async () => {
//     try {
//       // Check if passwords match
//       if (userData.password !== userData.confirmPassword) {
//         alert("Passwords do not match. Please try again.");
//         return;
//       }

//       // Hash the password before saving it
//       const hashedPassword = await hashPassword(userData.password);

//       // Create the user data object to send to the server
//       const userDataToSend = {
//         username: userData.username,
//         password: hashedPassword,
//         role: userData.role,
//       };

//       // Send the user data to the server
//       await axios.post("http://localhost:5000/api/public/add-user", userDataToSend);
//       console.log("User added successfully!");
//       alert("User added successfully!");
//       setUserData({
//         username: "",
//         password: "",
//         confirmPassword: "",
//         role: "",
//       });
//     } catch (error) {
//       console.error("Error adding user:", error);
//       alert("Failed to add user. Please try again later.");
//     }
//   };

//   const handleInputChange = (e) => {
//     setUserData({ ...userData, [e.target.name]: e.target.value });
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Add New User</h2>

//       <Form.Group style={{ marginBottom: "10px" }}>
//         <Form.Control
//           type="text"
//           placeholder="Username"
//           name="username"
//           value={userData.username}
//           onChange={handleInputChange}
//           required
//         />
//       </Form.Group>
//       <Form.Group style={{ marginBottom: "10px" }}>
//         <Form.Control
//           type="password"
//           placeholder="Password"
//           name="password"
//           value={userData.password}
//           onChange={handleInputChange}
//           required
//         />
//       </Form.Group>
//       <Form.Group style={{ marginBottom: "10px" }}>
//         <Form.Control
//           type="password"
//           placeholder="Confirm Password"
//           name="confirmPassword"
//           value={userData.confirmPassword}
//           onChange={handleInputChange}
//           required
//         />
//       </Form.Group>
//       <Form.Group style={{ marginBottom: "10px" }}>
//         <Form.Control
//           type="text"
//           placeholder="Role"
//           name="role"
//           value={userData.role}
//           onChange={handleInputChange}
//           required
//         />
//       </Form.Group>

//       <Button variant="primary" onClick={addUser}>
//         Add User
//       </Button>
//     </div>
//   );
// };

// export default UserForm;
import React from 'react'

const UserForm = () => {
  return (
    <div>UserForm</div>
  )
}

export default UserForm