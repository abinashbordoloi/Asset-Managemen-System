import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import routes from "./Routes"; 

function App() {
  return (
    <div className="App">
      <Router>
        <Sidebar />
        <Navbar />
        {routes()}
      </Router>
    </div>
  );
}

export default App;
