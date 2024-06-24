const express = require('express');
const { addProduct, getPr, deletePr} = require('../controllers/productController');
const { uploader } = require('../middlewares/multerMiddleware');
const { isLoggedIn, isAdmin } = require('../validation/authValidator');

const productRouter = express.Router();
productRouter.post('/add',isLoggedIn,isAdmin,uploader.single('productImage'),addProduct)
productRouter.get('/:id',getPr)
productRouter.delete('/:id',deletePr)

module.exports = {
    productRouter
}