const { findUser } = require('../repositories/userRepository');
const { registerUser, userUpdate } = require('../services/userService');
 async function createUser(req,res){

    try{
        const response = await registerUser(req.body);
        return res.json({
            message:"successfully registered user",
            success:true,
            data:response,
            error:{},
            cart:response.cart
        })
    }catch(error) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.reason,
            data: {},
            error: error
        })
    }
   
 }
 async function getUser(req,res){
    try{
        const {email} = req.query
        const response = await findUser({'email':email});
        return res.json({
            message:"successfully found user",
            success:true,
            data:response,
            error:{},
        })
    }catch(error) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.reason,
            data: {},
            error: error
        })
    }
   
 }

 
 async function updateUser(req,res){
    try{
        console.log(req.body)
        const response = await userUpdate(req.body);
        return res.json({
            message:"user details updated successfully",
            success:true,
            data:response,
            error:{},
        })
    }catch(error) {
        return res.status(error.statusCode).json({
            success: false,
            message: error.reason,
            data: {},
            error: error
        })
    }
   
 }



 module.exports={
    createUser,
    getUser,
    updateUser
}


