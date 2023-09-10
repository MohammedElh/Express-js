const express = require('express');
const router = express.Router()

const controller = require('../controllers/productsControllers')


router.get('/search',controller.searchById);
router.get('/',controller.getAllProducts);
router.get('/:id',controller.getProductsById);
router.delete('/:id',controller.deleteProducts);
router.post('/',controller.addProducts);
router.put('/',controller.updateProducts)

module.exports = {router}