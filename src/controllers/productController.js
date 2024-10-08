const { createProduct, getProduct, deleteProduct, getproducts, searchProduct } = require("../services/productService");
const AppError = require('../utils/appError')
async function addProduct(req,res){

    try{
        console.log(req.body)
        const product = await createProduct({
            ...req.body,
            imagePath:req.file.path
        })
        return res.status(201).json({
            success: true,
            message: 'Successfully created the product',
            error: {},
            data: product
        });
    }catch(err){
        console.log(err)
        return res.status(err.statusCode || 500).json({
            success: false,
            message: err.reason,
            data: {},
            error: err
        });
    }

}

async function getPr(req, res) {
    try {
        const response = await getProduct(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched the product',
            error: {},
            data: response
        })
    } catch (error) {
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                error: error
            });
        }
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error: error
        });
    }
}



async function deletePr(req, res) {
    try {
        const response = await deleteProduct(req.params.id);
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched the product',
            error: {},
            data: response
        })
    } catch (error) {
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                error: error
            });
        }
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error: error
        });
    }
}

async function getAllpr(req,res){
    try{
        const response = await getproducts()
        return res.status(200).json({
            success: true,
            message: 'Successfully fetched the products',
            error: {},
            data: response
        })
    }catch(error){
        if(error instanceof AppError) {
            return res.status(error.statusCode).json({
                success: false,
                message: error.message,
                data: {},
                error: error
            });
        }
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong',
            data: {},
            error: error
        });
    }
}


module.exports = {
    addProduct,
    getPr,
    deletePr,
    getAllpr,
    
}