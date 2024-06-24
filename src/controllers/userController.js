const Cart = require('../schema/cartSchema');
const { registerUser } = require('../services/userService');
 async function createUser(req,res){

    console.log("Create user Controller called");
    console.log(req.body)

    
    try{
        const response = await registerUser(req.body);
        return res.json({
            message:"successfully registered user",
            success:true,
            data:response,
            error:{},
            cart:newCart
        })
    }catch(err){
        return res.json({
            success:false,
            message:err.reason,
            data:{},
            error:err
        })
    }
 }

 module.exports={createUser}


