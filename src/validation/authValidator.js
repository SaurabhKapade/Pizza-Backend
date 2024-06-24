const jwt = require('jsonwebtoken')
const { JWT_SECRET } = require('../config/serverConfig')

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

    const decoded = jwt.verify(token,JWT_SECRET)

    if(!decoded){
        return res.status(401).json({
            success:false,
            data:{},
            message:'Invalid Token provided',
            error:"Not Authenticated"
        })
    }
    // of reacjed here then user is authenticated and allow to access the api

    req.user = {
        email:decoded.email,
        id:jwt.decode.id
    }
    next();
}

async function isAdmin(req,res,next){
    // this function checks an authenticated user is admin or not
    
}
module.exports = {
    isLoggedIn,
    isAdmin
}