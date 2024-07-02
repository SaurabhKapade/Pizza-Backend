const { getCart, modifyCart, clearProductsFromCart } = require("../services/cartService");
const AppError = require("../utils/appError");

async function getCartByUser(req,res){
    try{
        const cart = await getCart(req.user.id)
        return res.status(200).json({
            success:true,
            message:'Successfully fetched the cart',
            error:{},
            data:cart
        })
    }catch(err){
        console.log(err)

        if(err instanceof AppError){
            return res.status(err.statusCode).json({
                success:false,
                message:err.message,
                error:err,
                data:{}
            })
        }

        return res.status(500).json({
            success:false,
            message:"Something went wrong",
            error:err,
            data:{}
        })
    }

}




async function modifyProductToCart(req,res){
    try{
        const cart = await modifyCart(req.user.id,req.params.productId , req.params.operation == 'add')
        return res.status(200).json({
            success:true,
            message:'Successfully added product the cart',
            error:{},
            data:cart
        })
    }catch(err){
        console.log(err)

        if(err instanceof AppError){
            return res.status(err.statusCode).json({
                success:false,
                message:err.message,
                error:err,
                data:{}
            })
        }

        return res.status(500).json({
            success:false,
            message:"Something went wrong",
            error:err,
            data:{}
        })
    }

}

async function clearCartById(req,res){
    try{
        const cart = await clearProductsFromCart(req.user.id)
        return res.status(200).json({
            success:true,
            message:'Now your cart is Empty',
            error:{},
            data:cart
        })
    }catch(error){
        console.log(error)
        if(error instanceof AppError){
            return res.status(error.statusCode).json({
                success:false,
                message:error.message,
                error:error,
                data:{}
            })
        }
        return res.status(500).json({
            success:false,
            message:"Something went wrong",
            error:error,
            data:{}
        })
    }
}


module.exports ={
    getCartByUser,
    modifyProductToCart,
    clearCartById
}