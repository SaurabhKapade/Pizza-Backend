const { cloudinary }= require('../config/cloudinaryConfig')
const { insertProduct , getProductById ,deleteProductById, getAllProducts, searchProd } = require('../repositories/productRepository')
const fs = require('fs/promises')
async function createProduct (productDetails){
    const imagePath = productDetails.imagePath
    if(imagePath){
    try{
            const cloudinaryResponse = await cloudinary.uploader.upload(imagePath)
            console.log('cloudinary Response is ',cloudinaryResponse)
            var productImage = cloudinaryResponse.secure_url
            await fs.unlink(process.cwd() + "/" + imagePath);
       }catch(err){
            console.log(err);
       }
    }

    const product = await insertProduct({
        ...productDetails,
        productImage:productImage
    })

    if(!product){
        throw{reason:'not able to create Product',statusCode:500}
    }
    return product
}

async function getProduct(productId) {
    const response = await getProductById(productId);
    if(!response) {
        throw new NotFoundError('Product');
    }
    return response;
}

async function deleteProduct(productId) {
    const response = await deleteProductById(productId);
    if(!response) {
        throw new NotFoundError('Product');
    }
    return response;
}

async function getproducts(){
    const response = await getAllProducts()
    if(!response){
        throw new NotFoundError('products',500)
    }
    return response
}

module.exports = {
    createProduct,
    deleteProduct,
    getProduct,
    getproducts,
}