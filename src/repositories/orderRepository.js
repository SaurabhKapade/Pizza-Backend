const BadRequestError = require("../utils/BadRequest")
const InternalServerError = require("../utils/internalServerError")
const Order = require("../schema/orderSchema")
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
module.exports={
    createNewOrder
}