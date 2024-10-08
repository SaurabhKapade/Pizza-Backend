const express = require('express')
const { getCartByUser, modifyProductToCart, clearCartById, deleteProductById } = require('../controllers/cartController')
const { isLoggedIn } = require('../validation/authValidator')

const cartRouter = express.Router()

cartRouter.get('/',isLoggedIn,getCartByUser)

cartRouter.post('/:operation/:productId',isLoggedIn,modifyProductToCart)

cartRouter.delete('/products',isLoggedIn,clearCartById)

cartRouter.delete('/products/remove/:itemId',isLoggedIn,deleteProductById)

module.exports = cartRouter