const { createProduct, getProduct, deleteProduct } = require("../services/productService");
const AppError = require('../utils/appError')

async function addProduct(req,res){

    try{
        const product = await createProduct({
            productName:req.body.productName,
            description:req.body.description,
            imagePath:req.file.path,
            price:req.body.price,
            category:req.body.category,
            inStock:req.body.inStock
        })
        return res.status(201).json({
            success: true,
            message: 'Successfully created the product',
            error: {},
            data: product
        });
    }catch(err){
        console.log(err)
        return res.status(err.statusCode).json({
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

module.exports = {
    addProduct,
    getPr,
    deletePr

}