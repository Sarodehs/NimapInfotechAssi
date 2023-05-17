// const express = require("express");
// const app = express();
// const bodyParser = require("body-parser");
// const cors = require("cors");
// const mysql = require("mysql2");




// app.use(cors());
// app.use(express.json());
// app.use(bodyParser.urlencoded({extended:true}));


// app.get("/", (req, res)=>{
//     const sqlInsert ="INSEAT INTO product_table (ProductId,ProductName,CategoryId,CategoryName,Actions) VALUES  ('12','productsope','15','sope')"
//     db.query(sqlInsert,(error,result)=>{
//         console.log("error",error);
//         console.log("result",result);
//         res.send("hello expess")
//     })
  
  
// })
// app.listen(5000,()=>{
//     console.log("server is running on 5000")
// })




const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 5000;

// Create a connection pool for the MySQL database
const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"Asdfghjkl@12345",
    database:"product_table"
});


// Middleware to parse request bodies as JSON
app.use(bodyParser.json());

// Category routes
app.get('/categories', (req, res) => {
  // Retrieve all categories from the database
  pool.query('SELECT * FROM categories', (err, results) => {
    if (err) {
      console.error('Error retrieving categories:', err);
      res.status(500).json({ error: 'Failed to retrieve categories' });
    } else {
      res.json(results);
    }
  });
});

app.post('/categories', (req, res) => {
  // Create a new category in the database
  const { categoryName } = req.body;
  pool.query('INSERT INTO categories (name) VALUES (?)', [categoryName], (err, results) => {
    if (err) {
      console.error('Error creating category:', err);
      res.status(500).json({ error: 'Failed to create category' });
    } else {
      res.sendStatus(201);
    }
  });
});

// Product routes
app.get('/products', (req, res) => {
  const { page, pageSize } = req.query;
  const offset = (page - 1) * pageSize;
  
  // Retrieve paginated product records with category information from the database
  pool.query(`
    SELECT products.id AS productId, products.name AS productName,
           categories.name AS categoryName, categories.id AS categoryId
    FROM products
    INNER JOIN categories ON products.categoryId = categories.id
    ORDER BY products.id
    LIMIT ?, ?
  `, [offset, parseInt(pageSize)], (err, results) => {
    if (err) {
      console.error('Error retrieving products:', err);
      res.status(500).json({ error: 'Failed to retrieve products' });
    } else {
      res.json(results);
    }
  });
});

app.post('/products', (req, res) => {
  // Create a new product in the database
  const { productName, categoryId } = req.body;
  pool.query('INSERT INTO products (name, categoryId) VALUES (?, ?)', [productName, categoryId], (err, results) => {
    if (err) {
      console.error('Error creating product:', err);
      res.status(500).json({ error: 'Failed to create product' });
    } else {
      res.sendStatus(201);
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
