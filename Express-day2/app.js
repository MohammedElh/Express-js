const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const myFunctions = require('./routes/products')
app.use('/products', myFunctions.router);
const products = myFunctions.products;

// let products = [
//     { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
//     { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
//     { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
//     { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
//     { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
//     { id: 6, name: 'iPhone 12 Pro', price: 1099.99 },
//     { id: 7, name: 'Samsung Galaxy S21', price: 999.99 },
//     { id: 8, name: 'Sony PlayStation 5', price: 499.99 },
//     { id: 9, name: 'MacBook Pro 16', price: 2399.99 },
//     { id: 10, name: 'DJI Mavic Air 2', price: 799.99 },
// ];
// let products = [
//     { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
//     { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
//     { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
//     { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
//     { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
// ];

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

// app.get('/products', (req, res) => {
//   res.render('home', { products });
// });

app.get('/products/:id', (req, res) => {
  res.render('productDetails', { products, data: { id: req.params.id } });
});

app.all('*', (req, res, next) => {
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

