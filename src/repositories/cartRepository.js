const Cart = require('../schema/cartSchema')
const InternalServerError = require('../utils/internalServerError')
const NotFoundError = require('../utils/notFoundError')
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
        }).populate('items.product')
        return cart
    }catch(err){
        console.log(err.message)
        throw new InternalServerError()
    }
}
async function clearCart(userId){
    try{
        const cart = await Cart.findOne({user:userId});
        console.log('clearcart me se cart :',cart)
        if(!cart){
            throw new NotFoundError('Cart')
        }
        cart.items = []
        await cart.save()
        return cart;
    }catch(err){
        throw new InternalServerError()
    }
}
module.exports = {
    createCart,
    getCartByUserId,
    clearCart
}