const BadRequestError = require("../utils/BadRequest")
const InternalServerError = require("../utils/internalServerError")
const Order = require("../schema/orderSchema")
const NotFoundError = require("../utils/notFoundError")
const { findByIdAndUpdate } = require("../schema/cartSchema")
async function createNewOrder(orderDetails){
    try{
        const order = await Order.create(orderDetails)
        return order
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

async function getOrdersByUserId(userId){
    try{
        const orders = await Order.find({user:userId})
        return orders
    }catch(error){
        console.log(error)
        throw new InternalServerError();
    }
}

async function getOrderById(orderId){
   try {
        const order = await Order.findById(orderId)
        return order
   } catch (error) {
        console.log(error)
        throw new InternalServerError()
   }
}
async function updateOrderStatus(orderId,status){
    try {
        const order = await Order.findByIdAndUpdate(orderId,{status:status},{new:true})
        return order
    } catch (error) {
        console.log(error)
        throw new InternalServerError()
    }
}

module.exports={
    createNewOrder,
    getOrdersByUserId,
    getOrderById,
    updateOrderStatus
}