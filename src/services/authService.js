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

    const token = jwt.sign({email:user.email , id:user._id},JWT_SECRET,{expiresIn:'60h'})
    return token;

}
module.exports={
    loginUser
}