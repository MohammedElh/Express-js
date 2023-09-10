const express = require('express');
const app = express();
app.set('view engine', 'ejs');
const bodyParser = require('body-parser');
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

let products = [
    { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
    { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
    { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
    { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
    { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
    { id: 6, name: 'iPhone 12 Pro', price: 1099.99 },
    { id: 7, name: 'Samsung Galaxy S21', price: 999.99 },
    { id: 8, name: 'Sony PlayStation 5', price: 499.99 },
    { id: 9, name: 'MacBook Pro 16', price: 2399.99 },
    { id: 10, name: 'DJI Mavic Air 2', price: 799.99 },
];

app.use((req, res, next) => {
  const currentDateTime = new Date().toLocaleString();
  const requestMethod = req.method;
  const requestUrl = req.url;
  console.log(`--------New Request--------`);
  console.log(`Current time: ${currentDateTime}`);
  console.log(`request method: ${requestMethod}`);
  console.log(`request URL: ${requestUrl}`);
  next();
});

app.get('/', (req, res) => {
  res.render('main');
});

app.get('/products/search', (req, res) => {
  const q = req.query.q;
  const minPrice = req.query.minPrice;
  const maxPrice = req.query.maxPrice;
  var array = []

  for (let i = 0; i < products.length; i++) {
      if (minPrice <= products[i].price && maxPrice >= products[i].price) {
          array.push(products[i]);
      }
  }
  let responseHTML = `Searching for products with query: ${q}, minPrice: ${minPrice}, maxPrice: ${maxPrice} <br><br>`;
  array.forEach(product => {
      responseHTML += `Product: ${product.name}, Price: ${product.price} <br>`;
  });
  res.send(responseHTML); 
  //      http://localhost:3000/products/search?q=shoes&minPrice=0&maxPrice=1000
});

app.get('/products', (req, res) => {
  let responseHTML = '';
  products.forEach(product => {
      responseHTML += `Product: ${product.name}, Price: ${product.price} <br>`;
  });
  // Send the HTML response
  res.send(responseHTML);
});

app.get('/products/:id', (req, res) => {
  let selected = req.params.id;

  if (products[selected]) {
      res.send(`Product ID : ${(products[selected - 1].id)}. <br> Product Name : ${(products[selected - 1].name)}. <br> Product Price : ${(products[selected - 1].price)}`);
  } else {
      res.status(404).send('Product not found')
  }
});

app.post('/products/', (req, res) => {
  const newId = req.query.id;
  const newName = req.query.name;
  const newPrice = req.query.price;
  var newProduct={};
  if (req.query.id) {
      newProduct ={id: newId, name: newName, price: newPrice}
      products.push(newProduct);
      console.log(products);
res.send(newProduct)
      console.log('Product added successfully')
  } else {
      const err = new Error('Invalid product format.');
      err.status = 404;
      res.status(err.status).json({ message: err.message });
      console.log(error)
  }
});

app.delete('/products/:id', (req, res) => {
  for (let i = 0; i < products.length; i++) {
      if (products[i].id == req.params.id) {
          var selectedProduct = products[i];
          products.splice(i, 1);
      }
  }
  console.log(products);
  res.status(200).json(selectedProduct || "Product not found");
}
);

app.put('/products/:id', (req, res) => {
  let selected = req.params.id;
  if (products[selected]) {
      products.splice(1, i, userInput);
      res.json({ message: 'Product updated successfully' })
  } else {
      res.status(404).json({ message: 'Product not found' })
  }
})

app.all('*',(req, res, next) => {
  const err = new Error(`Can't find " ${req.originalUrl} " on the server!`);
  err.status = 'fail';
  err.statusCode = 404;
  console.log(`Error: ${err.message}`);
  next(err)
})

app.use((error, req, res, next) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message
  })
})

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});

