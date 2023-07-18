import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import { useHistory } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError("Please enter a username and password.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        "http://localhost:5000/api/public/passwords",
        {
          username,
          password,
        }
      );

      if (response.status === 200) {
        // Login successful, navigate to the Navbar page
        console.log("User authenticated successfully");
        navigate("/asset-entry");
      } else {
        // Login failed, display error message
        setError("Invalid username or password");
      }
    } catch (error) {
      console.error("An error occurred during login:", error);
      setError("An error occurred during login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex flex-column align-items-center">
      <h2 className="text-center">Asset Management System</h2>
      <img
        src="https://assets.sentinelassam.com/h-upload/2022/06/15/1600x960_355184-neepco.jpg"
        alt="NEEPCO"
        width="300"
        height="170"
      />
      <div className="container" style={{ maxWidth: "500px" }}>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Employee Id
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
