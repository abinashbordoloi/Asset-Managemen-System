import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const SignIn = () => {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object with the user's credentials
    const credentials = {
      email,
      password
    };

    try {
      // Make the API call to verify user credentials
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });

      if (response.ok) {
        // Authentication successful
        const data = await response.json();
        const authToken = data.token; // Replace with the actual token property received from the response
        localStorage.setItem('authToken', authToken);

        // Redirect the user to the desired page, such as the home page or their profile
        history.push('/');
      } else {
        // Authentication failed
        const errorData = await response.json();
        const error = errorData.error; // Replace with the actual error message received from the response
        console.error(error);
      }
    } catch (error) {
      console.error('Error occurred during authentication:', error);
    }
  };

  return (
    <div className="signin-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default SignIn;
