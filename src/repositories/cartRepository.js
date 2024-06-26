const Cart = require('../schema/cartSchema')
async function createCart(userId){
    try{
        const newCart = await Cart.create({
            user:userId
        })
        return newCart
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

async function getCartByUserId(userId){
    try{
        const cart = await Cart.findOne({
            user:userId
        })
        return cart
    }catch(err){
        console.log(err)
        throw new InternalServerError()
    }
}
module.exports = {
    createCart,
    getCartByUserId
}