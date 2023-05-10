import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductMaster() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  // const [editingProductId, setEditingProductId] = useState(null);

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
    axios.post('/products', { name, price, categoryId })
      .then(response => {
        setProducts([...products, response.data]);
        setName('');
        setPrice('');
        setCategoryId('');
      })
      .catch(error => {
        console.error('Error creating product:', error);
      });
  };

  // Handle form submission to update a product
  // const handleUpdate = (id, newName, newPrice, newCategoryId) => {
  //   axios.put(`/products/${id}`, { name: newName, price: newPrice, categoryId: newCategoryId })
  //     .then(response => {
  //       const updatedProducts = products.map(product => {
  //         if (product.id === id) {
  //           return response.data;
  //         } else {
  //           return product;
  //         }
  //       });
  //       setProducts(updatedProducts);
  //       setEditingProductId(null);
  //     })
  //     .catch(error => {
  //       console.error(`Error updating product ${id}:`, error);
  //     });
  // };

  // Handle form submission to delete a product
  // const handleDelete = id => {
  //   axios.delete(`/products/${id}`)
  //     .then(() => {
  //       const updatedProducts = products.filter(product => product.id !== id);
  //       setProducts(updatedProducts);
  //     })
  //     .catch(error => {
  //       console.error(`Error deleting product ${id}:`, error);
  //     });
  // };

  // Get the name of a category based on its ID
  // const getCategoryNameById = categoryId => {
  //   const category = categories.find(category => category.id === categoryId);
  //   return category ? category.name : '';
  // };

  return (
    <div>
      <h1>Product Master</h1>

      {/* Create product form */}
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit}>
      <br></br>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={name} onChange={event => setName(event.target.value)} /><br></br>
        <br></br>
        <label htmlFor="price">Price:</label>
        <input type="number" id="price" name="price" value={price} onChange={event => setPrice(event.target.value)} /><br></br>
        <br></br>
        <label htmlFor="category">Category:</label>
        <select id="category" name="category" value={categoryId} onChange={event => setCategoryId(event.target.value)}><br></br>
        <br></br>
          <option value="">Select a category...</option>
          {categories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select><br></br>
        <br></br>
        <button type="submit">Create</button>
      </form>

      </div>
  )
}

export default ProductMaster;
