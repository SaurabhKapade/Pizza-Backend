const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    items:[{
        products:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Product',
            required:true
        },
        quantity:{
            type:Number,
            default:1,
            required:true
        }
    }],
    totalPrice:{
        type:Number,
        required:true
    },
    status:{
        type:String,
        enum:['ORDERED','CANCELED','DELIVERED','PROCESSING','OUT_FOR_DELIVERY'],
        default:'ORDERED'
    },
    address:{
        type:String,
        minlength:[10,"Address should be of atleast 10 characters"]
    },
    aymentMethod:{
        type:String,
        enum:['ONLINE','CASH'],
        default:'CASH'
    }
},{timestamps:true})

const Order = mongoose.model('Order',orderSchema)
module.exports = Order
