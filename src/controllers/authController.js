const { loginUser } = require("../services/authService")

async function login(req,res){
  try{

    const loginPayload = req.body
    const response = await loginUser(loginPayload)

    res.cookie('authToken',response,{
        httpOnly:true,
        secure:false,
        maxAge:7*24*60*60*1000
    })
  
    return res.status(200).json({
        success:true,
        message:'user logedIn successfully',
        data:response,
        error:{}
    })
  }catch(err){
    return res.status(400).json({
        success:false,
        message:err.message,
        data:{},
        error:err
    })
  }
}

async function logOut(req,res){
  res.cookie("authToken","",{
    httpOnly:true,
    secure:false
  })
  return res.status(200).json({
    success:true,
    message:"Log Out successfully",
    error:{},
    data:{}
  })
}
module.exports = {
    login,
    logOut
}