import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { ScaleLoader } from "react-spinners";
import "./LoginScreen.css";

const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
`;

const LoginForm = ({ onLogin }) => {
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
        
        console.log("User authenticated successfully");
        onLogin();
        navigate("/asset-entry");
      } else {
        
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
    <div className="container">
      <div id="main-outer-div">
        <div id="logo-div">
          <img
            id="logo-img"
            // src="https://assets.sentinelassam.com/h-upload/2022/06/15/1600x960_355184-neepco.jpg"
            src="./logo.ico"
            alt="NEEPCO"
            width="300"
            height="170"
          />
        </div>
        <div id="title-div" style={{ marginTop: "20px" }}>
          <h4 className="title">ASSET MANAGEMENT SYSTEM</h4>
        </div>

        <div id="outer-login-form-div">
          <form onSubmit={handleSubmit}>
            <input
              className="login-form-input "
              type="text"
              placeholder="Employee Id"
              required
              value={username}
              onChange={handleUsernameChange}
            />
            <input
              className="login-form-input"
              type="password"
              placeholder="Password"
              required
              value={password}
              onChange={handlePasswordChange}
            />
            {error && <p className="alert alert-danger">{error}</p>}
            <input
              className="login-form-input blue-button"
              type="submit"
              value={loading ? "Loading..." : "Submit"}
              id="submitBtn"
              disabled={loading}
            />
          </form>
        </div>

        <div className="loading">
          <ScaleLoader
            css={override}
            sizeUnit={"px"}
            size={150}
            color={"#123abc"}
            loading={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
