const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/serverConfig')
const UnauthorisedError = require('../utils/unauthorisedError')

async function isLoggedIn(req,res,next){
    const token = req.cookies['authToken']
    if(!token){
        return res.status(401).json({
            success:false,
            data:{},
            message:'No auth Token provided',
            error:"Not Authenticated"
        })
    }
    try{
        const decoded = jwt.verify(token,JWT_SECRET)
        if(!decoded){
            throw new UnauthorisedError()
        }
        req.user = {
            email:decoded.email,
            id:decoded.id,
            role:decoded.role
        }
    }catch(err){
        return res.status(401).json({
            success:false,
            data:{},
            error:err,
            message:"Invalid token provided"
        })
    }

    next();
}

async function isAdmin(req,res,next){
    // this function checks an authenticated user is admin or not
    const loggedInUser = req.user;
    if(loggedInUser.role ==="ADMIN"){
        console.log('user is ',loggedInUser)
        next();
    }else{
        return res.status(401).json({
            success:false,
            data:{},
            message:"You are not authorised for this action",
            error:{
                statusCode:401,
                reason:"Unauthorised user for this action"
            }
        })
    }
    
}
module.exports = {
    isLoggedIn,
    isAdmin
}