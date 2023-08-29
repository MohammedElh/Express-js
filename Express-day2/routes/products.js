const express = require('express');
const router = express.Router()

// const myFunctions = require('../app.js')
// const products = myFunctions.products;
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

router.get('/search', (req, res) => {
    const searchQuery = req.query.q;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    var array = []

    for (let i = 0; i < products.length; i++) {
        if (minPrice <= products[i].price && maxPrice >= products[i].price) {
            array.push(products[i]);
        }
    }
    let responseHTML = `Searching for products with query: ${searchQuery}, minPrice: ${minPrice}, maxPrice: ${maxPrice} <br><br>`;
    array.forEach(product => {
        responseHTML += `Product: ${product.name}, Price: ${product.price} <br>`;
    });
    res.send(responseHTML);
    //      http://localhost:3000/products/search?q=shoes&minPrice=20&maxPrice=100
});

// router.get('/', (req, res) => {
//     let responseHTML = '';
//     products.forEach(product => {
//         responseHTML += `Product: ${product.name}, Price: ${product.price} <br>`;
//     });
//     // Send the HTML response
//     res.send(responseHTML);
// });


// router.get('/:id', (req, res) => {
//     let selected = req.params.id;

//     if (products[selected]) {
//         res.send(`Product ID : ${(products[selected - 1].id)}. <br> Product Name : ${(products[selected - 1].name)}. <br> Product Price : ${(products[selected - 1].price)}`);
//     } else {
//         res.status(404).send('Product not found')
//     }
// });

router.post('/', (req, res) => {
    if (req.body.id) {
        const newProduct = req.body;
        products.push(newProduct);
        console.log(products);
        res.status(201).json(newProduct);
        console.log('Product added successfully')
    } else {
        const err = new Error('Invalid product format.');
        err.status = 404;
        res.status(err.status).json({ message: err.message });
    }
});

router.delete('/:id', (req, res) => {
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

router.put('/:id', (req, res) => {
    LastId = products[products.length - 1].id;

    let selected = req.params.id;
    if (products[selected]) {
        products.splice(1, i, userInput);
        res.json({ message: 'Product updated successfully' })
    } else {
        res.status(404).json({ message: 'Product not found' })
    }
})

module.exports = router;