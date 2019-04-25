const express = require('express')
const productCtrl = require('../controllers/Product')
const productRouter = express.Router()


productRouter.get('/', productCtrl.showProduct)
productRouter.get('/add', productCtrl.showAddProduct)
productRouter.post('/add', productCtrl.productAdd)
productRouter.get('/edit', productCtrl.showProductEdit)
productRouter.post('/edit', productCtrl.ProductEdit)
productRouter.get('/delete', productCtrl.deleteProduct)


module.exports = productRouter