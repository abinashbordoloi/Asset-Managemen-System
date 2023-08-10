import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import backgroundImage from './tablebg.jpg';

const UserForm = () => {
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    role: '',
  });

  const [showPassword, setShowPassword] = useState(false);

  const addUser = async () => {
    try {
      // Check if passwords match
      if (userData.password !== userData.confirmPassword) {
        alert('Passwords do not match. Please try again.');
        return;
      }

      // Send the user data to the server for registration
      const response = await axios.post('http://localhost:5000/api/public/register', {
        username: userData.username,
        password: userData.password,
        role: userData.role,
      });

      if (response.status === 201) {
        console.log('User added successfully!');
        alert('User added successfully!');
        
        setUserData({
          username: '',
          password: '',
          confirmPassword: '',
          role: '',
        });
      } else if (response.status === 409) {
        alert('Username already exists. Please choose a different username.');
      } else {
        alert('Failed to add user. Please try again.');
      }
    } catch (error) {
      console.error('Error adding user:', error);
      alert('Failed to add user. Please try again later.');
    }
  };
  
  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
    setTimeout(() => {
      setShowPassword(false);
    }, 20000); // 20 seconds
  };

  return (
    <div className="bg-image h-100" 
  style={{ backgroundImage: `url(${backgroundImage})`, 
  backgroundSize: 'cover', 
  backgroundPosition: 'center', 
  height: "500px", overflowY: "auto",
}}>
    <div className="mask d-flex align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="card shadow-2-strong" style={{ backgroundColor: "#d9d9d" }}>
                <div className="card-body">
      <h2>Add New User</h2>
      <div className="form-responsive" style={{  width: "1000px", margin: "auto" }} >
      <Form.Group style={{ marginBottom: '10px' }}>
        <Form.Control
          type="text"
          placeholder="Username"
          name="username"
          value={userData.username}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Form.Group style={{ marginBottom: '10px' }}>
        <Form.Control
          as="select" // Use "as" prop to specify the element type
          name="role"
          value={userData.role}
          onChange={handleInputChange}
          required
        >
          <option value="" disabled>Select Role</option>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </Form.Control>
      </Form.Group>

      <Form.Group style={{ marginBottom: '10px' }}>
        <InputGroup>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            name="password"
            value={userData.password}
            onChange={handleInputChange}
            required
          />
          <InputGroup.Text>
            <Button variant="link" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </Button>
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Form.Group style={{ marginBottom: '10px' }}>
        <InputGroup>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm Password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleInputChange}
            required
          />
          <InputGroup.Text>
            <Button variant="link" onClick={togglePasswordVisibility}>
              <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
            </Button>
          </InputGroup.Text>
        </InputGroup>
      </Form.Group>

      <Button variant="primary" onClick={addUser}>
        Add User
      </Button>
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

export default UserForm;


