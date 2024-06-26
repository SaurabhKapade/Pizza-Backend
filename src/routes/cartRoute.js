const express = require('express')
const { getCartByUser } = require('../controllers/cartController')
const { isLoggedIn } = require('../validation/authValidator')

const cartRoute = express.Router()

cartRoute.get('/',isLoggedIn,getCartByUser)

module.exports = cartRoute