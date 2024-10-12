const express = require('express');
const login = require('../services/authService');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { findUser } = require('../repositories/userRepository');
const { JWT_SECRET } = require('../config/serverConfig');

async function loginUser(authDetails){
    const email = authDetails.email
    const plainPassword = authDetails.password

    const user = await findUser({email})
    if(!user){
        throw{message:'No user found with the given email',statuscode:404}
    }
    
    const isPasswordvalidated = await bcrypt.compare(plainPassword,user.password)
    if(!isPasswordvalidated){
        throw{message:'Invalid password Please try again',statuscode:404}
    }

    const userRole = user.role?user.role:"USER"

    const token = jwt.sign({email:user.email , id:user._id , role:userRole },JWT_SECRET,{expiresIn:'60h'})
    return {token,userRole,userData:{
        email:user.email,
        firstName:user.firstName,
        id:user._id
    }};

}
module.exports={
    loginUser
}