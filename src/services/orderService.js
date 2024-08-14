const { getCartByUserId, clearCart } = require("../repositories/cartRepository")
const {findUser} = require("../repositories/userRepository")
const NotFoundError = require("../utils/notFoundError")
const badRequestError = require("../utils/BadRequest")
const { createNewOrder } = require("../repositories/orderRepository")
const InternalServerError = require("../utils/internalServerError")

async function createOrder(userId,paymentMethod){
    const cart = await getCartByUserId(userId)
    const user = await findUser({_id:cart.user})
    if(!cart){
        throw new NotFoundError('Cart')
    }

    if(cart.items.length == 0){
        throw new badRequestError(["cart is empty, please add some items to the cart"])
    }
    const orderObj = {}
    orderObj.user = cart.user
    orderObj.items = cart.items.map(cartItem=>{
        return{products:cartItem.product._id,quantity:cartItem.quantity}
    })
    orderObj.staus = 'ORDERED'
    orderObj.totalPrice = 0
    cart.items.forEach((cartItem)=>{
        orderObj.totalPrice += cartItem.quantity * cartItem.product.price
    })
    orderObj.address = user.address
    orderObj.paymentMethod = paymentMethod

    const order = await createNewOrder(orderObj)
    if(!order){
        throw new InternalServerError()
    }

    await clearCart(userId)
    cart.save()
    return order
}
module.exports={
    createOrder
}