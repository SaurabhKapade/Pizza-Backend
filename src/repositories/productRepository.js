const { response } = require('express');
const product = require('../schema/productSchema');
const BadRequestError = require('../utils/badRequest');
const InternalServerError = require('../utils/internalServerError')
async function insertProduct(ProductData){
    try{
        const item = await product.create(ProductData)
        return item
    }catch(error){
        if(error.name==='ValiadationError'){

          const errorMessageList =  Object.keys(error.erros).forEach.map((property)=>{
               return error.errors[property].message
            })
            throw new BadRequestError(errorMessageList)
        }
        console.log(error)
        throw new InternalServerError();
    }
}

async function getProductById(productId) {
    try {
        const response = await product.findById(productId);
        return response;
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
}
async function deleteProductById(productId) {
    try {
        const response = await product.findByIdAndDelete(productId);
        return response;
    } catch (error) {
        console.log(error);
        throw new InternalServerError();
    }
}
module.exports = {
    insertProduct,
    getProductById,
    deleteProductById
}