import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductMasters() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState('');

  // Fetch products and categories from the server on component mount
  useEffect(() => {
    axios.get('/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });

    axios.get('/categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('Error fetching categories:', error);
      });
  }, []);

  // Handle form submission to create a new product
  const handleSubmit = event => {
    event.preventDefault();
    axios.post('/products', { name, categoryId })
      .then(response => {
        setProducts([...products, response.data]);
        setName('');
        setCategoryId('');
      })
      .catch(error => {
        console.error('Error creating product:', error);
      });
  };

  // Handle form submission to update a product
  const handleUpdate = (id, newName, newCategoryId) => {
    axios.put(`/products/${id}`, { name: newName, categoryId: newCategoryId })
      .then(response => {
        const updatedProducts = products.map(product => {
          if (product.id === id) {
            return response.data;
          } else {
            return product;
          }
        });
        setProducts(updatedProducts);
      })
      .catch(error => {
        console.error(`Error updating product ${id}:`, error);
      });
  };

  // Handle form submission to delete a product
  const handleDelete = id => {
    axios.delete(`/products/${id}`)
      .then(() => {
        const updatedProducts = products.filter(product => product.id !== id);
        setProducts(updatedProducts);
      })
      .catch(error => {
        console.error(`Error deleting product ${id}:`, error);
      });
  };

  return (
    <div>
      <h1>Product Master</h1>

      {/* Create product form */}
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={event => setName(event.target.value)} /><br></br> <br></br>
        <label htmlFor="category">Category:</label>
        <select id="category" name="category" value={categoryId} onChange={event => setCategoryId(event.target.value)}><br></br> <br></br>
          <option value="">Select a category...</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select><br></br> <br></br>
        <button type="submit">Create</button>
      </form>

      {/* Product list */}
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>ProductId</th>
            <th>ProductName</th>
            <th>CategoryId</th>
            <th>CategoryName</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.category.id}</td>
              <td>{product.CategoryName}</td>
              <td><button onClick={() => handleUpdate(products.id)}>Delete</button></td>

              <td><button onClick={() => handleDelete(products.id)}>Delete</button></td>

              <td></td>
            </tr>
          ))}
          </tbody>
          </table>
          
          </div>
  )
          }
export default ProductMasters;