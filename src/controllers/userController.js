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

 module.exports={createUser}


