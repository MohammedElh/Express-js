const express = require('express');
const app = express();
app.set('view engine', 'ejs');
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
const myFunctions = require('./routes/products')

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
app.use('/products', myFunctions.router);
const products = myFunctions.products;

app.get('/', (req, res) => {
  res.render('main');
});

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

