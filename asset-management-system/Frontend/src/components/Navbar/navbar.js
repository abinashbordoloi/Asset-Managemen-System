// import React, { useState, useEffect } from 'react';
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Navbar = () => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [username , setUsername] = useState('');
// const username = 'test';
const isLoggedIn = true;


//   useEffect(() => {
//     axios.get('/api/user').then((response) => {
//       setIsLoggedIn(response.data.isLoggedIn);
//       setUsername(response.data.username);
// //     });
// //   }, []);

//   const handleLogout = () => {
//     axios.post('/api/logout').then(() => {
//       setIsLoggedIn(false);
//       setUsername('');
//     });
//   };


const handleLogout = () => {
    axios.post('/api/logout').then(() => {
      // Redirect to the home page
      window.location.href = '/';
    });
  };

  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/assets">Assets</Link>
        </li>
        {isLoggedIn && (
          <li>
            <Link to="/profile">Profile</Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};




export default Navbar;
