import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CategoryMaster() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');

  // Fetch categories from the server on component mount
    useEffect(() => {
    axios.get('/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  });

  // Handle form submission to create a new category
  const handleSubmit = event => {
    event.preventDefault();
    axios.post('/categories', { name })
      .then(response => {
        setCategories([...categories, response.data]);
        setName('');
      })
      .catch(error => {
        console.error('Error creating category:', error);
      });
  };

  // Handle form submission to update a category
  const handleUpdate = (id, newName) => {
    axios.put(`/categories/${id}`, { name: newName })
      .then(response => {
        const updatedCategories = categories.map(category => {
          if (category.id === id) {
            return response.data;
          } else {
            return category;
          }
        });
        setCategories(updatedCategories);
      })
      .catch(error => {
        console.error(`Error updating category ${id}:`, error);
      });
  };

  // Handle form submission to delete a category
  const handleDelete = id => {
    axios.delete(`/categories/${id}`)
      .then(() => {
        const updatedCategories = categories.filter(category => category.id !== id);
        setCategories(updatedCategories);
      })
      .catch(error => {
        console.error(`Error deleting category ${id}:`, error);
      });
  };

  return (
    <div>
      <h1>Category Master</h1>

      {/* Create category form */}
      <h2>Create Category</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={event => setName(event.target.value)} /><br></br> <br></br>
        <button type="submit">Create</button>
      </form>

      {/* List of categories */}
      <h2>Category List</h2>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            {category.name}

            {/* Update category form */}
            <form onSubmit={event => { event.preventDefault(); handleUpdate(category.id, event.target.name.value); }}>
              <label htmlFor={`update-name-${category.id}`}>Name:</label>
              <input type="text" id={`update-name-${category.id}`} name="name" defaultValue={category.name} /><br /><br></br> <br></br><br></br> <br></br>
              <button type="submit">Update</button>
            </form>

            {/* Delete category button */}
            <button onClick={() => handleDelete(category.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CategoryMaster;
