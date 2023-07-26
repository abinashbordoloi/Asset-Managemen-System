import React, { useState } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";

const CategoryForm = () => {
  const [categoryData, setCategoryData] = useState({
    name: "",
    description: "",
  });

  const addCategory = async () => {
    try {
      await axios.post("http://localhost:5000/api/public/add-Category", categoryData);
      console.log("Category added successfully!");
      alert("Category added successfully!");
      setCategoryData({
        name: "",
        description: "",
      });
    } catch (error) {
      console.error("Error adding category:", error);
      alert("Failed to add category. Please try again later.");
    }
  };

  const handleInputChange = (e) => {
    setCategoryData({ ...categoryData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Add New Category</h2>

      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Name"
          name="name"
          value={categoryData.name}
          onChange={handleInputChange}
          required
        />
      </Form.Group>
      <Form.Group style={{ marginBottom: "10px" }}>
        <Form.Control
          type="text"
          placeholder="Description"
          name="description"
          value={categoryData.description}
          onChange={handleInputChange}
          required
        />
      </Form.Group>

      <Button variant="primary" onClick={addCategory}>
        Add Category
      </Button>
    </div>
  );
};

export default CategoryForm;
