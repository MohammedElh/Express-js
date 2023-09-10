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

const getAllProducts = (req, res) => {
    res.render('../views/home', { products });
}
const getProductsById = (req, res) => {
    id= req.params.id;
    res.render('../views/productDetails', { products, id});
}
const searchById = (req, res) => {
    const q = req.query.q;
    const minPrice = req.query.minPrice;
    const maxPrice = req.query.maxPrice;
    var array = []

    for (let i = 0; i < products.length; i++) {
        if (minPrice <= products[i].price && maxPrice >= products[i].price) {
            array.push(products[i]);
        }
    }
    let responseHTML = `Searching for products with minPrice: ${minPrice} and maxPrice: ${maxPrice} <br><br>`;
    array.forEach(product => {
        responseHTML += `Product: ${product.name}, Price: ${product.price} <br>`;
    });
    res.send(responseHTML);
    //      http://localhost:3000/products/search?q=shoes&minPrice=0&maxPrice=1000
}
const deleteProducts = (req, res) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id == req.params.id) {
            var selectedProduct = products[i];
            products.splice(i, 1);
        }
    }
    console.log(products);
    res.status(200).json(selectedProduct || "Product not found");
}
const addProducts = (req, res) => {
    const newId = req.query.id;
    const newName = req.query.name;
    const newPrice = req.query.price;
    var newProduct = {};
    if (req.query.id) {
        newProduct = { id: newId, name: newName, price: newPrice }
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
}
const updateProducts = (req, res) => {
    const id = Number(req.query.id);
    const name = req.query.name;
    const price = Number(req.query.price);
    const selectedProduct ={id, name, price};
    for (let i = 0; i < products.length; i++) {
        if (products[i]==id) {
            products.splice(i,0,selectedProduct);
            console.log(products)
            return res.json({ message: 'Product updated successfully' })
        }
        res.status(404).json({ message: 'Product not found' })
    }
}
module.exports = {
    getAllProducts,
    getProductsById,
    searchById,
    deleteProducts,
    addProducts,
    updateProducts
}