const express = require('express');
const app = express();

let products = [
    { id: 1, name: 'iPhone 12 Pro', price: 1099.99 },
    { id: 2, name: 'Samsung Galaxy S21', price: 999.99 },
    { id: 3, name: 'Sony PlayStation 5', price: 499.99 },
    { id: 4, name: 'MacBook Pro 16', price: 2399.99 },
    { id: 5, name: 'DJI Mavic Air 2', price: 799.99 },
];
app.post('/products', (req, res) => {
    const newProduct = req.body;
    // Add validation and data sanitization as needed
    newProduct.id = products.length + 1; // Assign a new ID (in a real app, this might come from a database sequence)
  
    // Add the new product to the products array (for demonstration purposes)
    products.push(newProduct);
  
    // Respond with the newly created product and a "Created" status code (201)
    res.status(201).json(newProduct);
  });
app.delete('/product/:id',(req,res)=>{
    let selected = req.params.id;
    for (let i = 0; i < products.length; i++) {
        if(products[i].id===selected){
            products.splice(1,i);
            res.json({ message: 'Product deleted successfully' })
        }else{
            res.status(404).json({ message: 'Product not found' })
        }
    }
  })
// GET request to search for products based on query parameters
app.get('/products', (req, res) => {
    //     for (i = 0; i < products.length; i++) {
    //         var Id=[''];
    //         var Name=[''];
    //         var Price=[''];
    //         var data=[''];
    //         Id[i] = products[i].id;
    //         Name[i] = products[i].name;
    //         Price[i] = products[i].price;
    //         data[i] =`Id: ${Id[i]}, Name: ${Name[i]}, Price: ${Price[i]}`
    // }
    let responseHTML='';
    products.forEach(product => {
        responseHTML += `Product: ${product.name}, Price: ${product.price} <br>`;
      });
    
      // Send the HTML response
      res.send(responseHTML);
});
app.get('/products/search', (req, res) => {
    const searchQuery = req.query.q;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    // Use the searchQuery, minPrice, and maxPrice to perform a search in the database
var array=[]
for (let i = 0; i < products.length; i++) {
    if (minPrice <= products[i].price && maxPrice >= products[i].price){
    array.push(products[i]);}
}
let responseHTML = `Searching for products with query: ${searchQuery},
                       minPrice: ${minPrice}, maxPrice: ${maxPrice} <br><br>`;
  
  // Add the search results to the HTML response
  array.forEach(product => {
    responseHTML += `Product: ${product.name}, Price: ${product.price} <br>`;
  });

  // Send the HTML response
  res.send(responseHTML);
//http://localhost:3000/products/search?q=shoes&minPrice=20&maxPrice=100
});
// GET request to retrieve a specific product by ID
app.get('/products/:id', (req, res) => {
    let selected = req.params.id;

    // Use the productId to fetch the corresponding product from the database
    // for (i = 0; i < products.length; i++) {
    //     if (productId == products[i].id) {
    //         selected = products[i];
    //     }
    // }
    // Return the product information as the response
    res.send(`Product ID : ${(products[selected - 1].id)}. <br> Product Name : ${(products[selected - 1].name)}. <br> Product Price : ${(products[selected - 1].price)}`);
});

app.listen(3000, () => {
    console.log('Server is listening on port 3000');
});
