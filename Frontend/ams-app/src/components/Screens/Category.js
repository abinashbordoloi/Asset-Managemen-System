import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const CategoryScreen = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editedCategory, setEditedCategory] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  // Function to fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/public/Category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Function to start editing a category
  const handleEditCategory = (category) => {
    setEditingCategoryId(category.id);
    setEditedCategory(category);
  };

  // Function to handle input change for edited category
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  };

  // Function to save changes for the edited category
  const handleSaveChanges = async () => {
    try {
      await axios.put(
        `http://localhost:5000/api/public/Category/${editingCategoryId}`,
        editedCategory
      );
      console.log("Category updated successfully!");
      setEditingCategoryId(null);
      fetchCategories();
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  // Function to cancel editing a category
  const handleCancelEdit = () => {
    setEditingCategoryId(null);
  };

  return (
    <div>
      <h2>Categories</h2>

      <Button variant="primary" href="/add-category" style={{ marginBottom: "10px" }}>
        Add New Category
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>
                {editingCategoryId === category.id ? (
                  <Form.Control
                    type="text"
                    name="name"
                    value={editedCategory.name}
                    onChange={handleInputChange}
                  />
                ) : (
                  category.name
                )}
              </td>
              <td>
                {editingCategoryId === category.id ? (
                  <Form.Control
                    type="text"
                    name="description"
                    value={editedCategory.description}
                    onChange={handleInputChange}
                  />
                ) : (
                  category.description
                )}
              </td>
              <td>
                {editingCategoryId === category.id ? (
                  <>
                    <Button variant="success" onClick={handleSaveChanges}>
                      Save
                    </Button>{" "}
                    <Button variant="secondary" onClick={handleCancelEdit}>
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button variant="primary" onClick={() => handleEditCategory(category)}>
                    Edit
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default CategoryScreen;
