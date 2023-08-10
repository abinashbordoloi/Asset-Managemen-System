import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Table, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import backgroundImage from "./tablebg.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit,faTimes } from "@fortawesome/free-solid-svg-icons";

const CategoryScreen = () => {
  const navigate = useNavigate();

  const handleAddCategoryClick = () => {
    navigate("/add-category");
  };
  const [categories, setCategories] = useState([]);
  const [editingCategoryId, setEditingCategoryId] = useState(null);
  const [editedCategory, setEditedCategory] = useState({
    name: "",
    description: "",
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  //to fetch categories from the API
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/public/Category");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  //to start editing a category
  const handleEditCategory = (category) => {
    setEditingCategoryId(category.id);
    setEditedCategory(category);
  };

  //to handle input change for edited category
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedCategory((prevCategory) => ({ ...prevCategory, [name]: value }));
  };

  // save changes for the edited category
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

  //to cancel editing a category
  const handleCancelEdit = () => {
    setEditingCategoryId(null);
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
              <div className="card shadow-2-strong" style={{ backgroundColor: "#f5f7fa" }}>
                <div className="card-body">
      <h2>Categories</h2>

      <Button variant="primary" onClick={handleAddCategoryClick} className="mt-4 w-100" style={{ marginBottom: "10px" }}>
        Add New Category
      </Button>
<div className="table-responsive" style={{  width: "1000px", margin: "auto" }} >
       <Table striped bordered hover className="mb-0">
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
                    <FontAwesomeIcon icon={faEdit} /> 
                    </Button>{" "}
                    <Button variant="secondary" onClick={handleCancelEdit}>
                      <FontAwesomeIcon icon={faTimes} /> 
                    </Button>
                  </>
                ) : (
                  <Button variant="primary" onClick={() => handleEditCategory(category)}>
                     <FontAwesomeIcon icon={faEdit} /> 
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
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

export default CategoryScreen;
