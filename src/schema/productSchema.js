const mongoose = require('mongoose');
const productSchema = new mongoose.Schema({
    productName:{
        type:String,
        required:[true,"productName is required"],
        minlength:[5,'productName must be atleast 5 character'],
        trim:true
    },
    description:{
        type:String,
        // required:[true,"discription is required"],
        unique:true,
        minlength:[5,"discription must be atleast 5 character long"],
        maxlength: [100, "discription should be less than or equal to 100 characters"]
    },
    productImage:{
        type:String,
    },
    quantity:{
        type:Number,
        required:true,
        default:10
    },
    price:{
        type:Number,
        required:[true,"product price is required"],
    },
    category:{
        type:String,
        enum:['Veg','Non-Veg','Drinks','Sides'],
        default:'Veg'
    },
    inStock:{
        type:Boolean,
        required:[true,'In Stock status is required'],
        default:true
    }
},{timestamps:true})

const Product = mongoose.model('Product',productSchema);
module.exports = Product;