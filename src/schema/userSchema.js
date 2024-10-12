const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    firstName:{
        type:String,
        required:[true,"first Name is required"],
        minlength:[5,"First Name must be atleast 5 character long"],
        // lowercase:true,
        trim:true,
        maxlength: [20, "First name should be less than or equal to 20 characters"]
    },

    lastName: {
        type: String,
        required: [true, "last Name is required"],
        minlength: [3, "First name must be atleast 5 character long"],
        // lowercase: true,
        trim: true, // if the user gives extra spaces then it will automatically remove it
        maxlength: [20, "last name should be less than or equal to 20 characters"]
    },

    mobileNumber: {
        type: String,
        trim: true,
        maxlength: [10, "Phone number should be of length 10"],
        minlength: [10, "Phone number should be of length 10"],
        unique: [true, "Phone number is already in use"],
        required: [true, "Phone number should be provided"]
    },
    email: {
        type: String,
        trim: true,
        required: [true, "Email should be provoided"],
        unique: [true, "Email is already in use"],
        match:  [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        required: [true, "Password should be provided"],
        minlength: [6, "Password should be minimum 6 character long"]
    },
    role:{
        type:String,
        enum:['ADMIN','USER'],
        default:'USER'
    },
    address:{
        type:String,
        minlength:[10,"Address should be of atleast 10 characters"]
    },
    },{
        timestamps:true
    })

    userSchema.pre('save',async function(){
        this.password = await bcrypt.hash(this.password,10)
    })
    
    const User = mongoose.model("User",userSchema);
    module.exports = User