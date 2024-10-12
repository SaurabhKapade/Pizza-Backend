const express = require('express');
const { createUser, getUser, updateUser } = require('../controllers/userController');
const userRouter = express.Router();

userRouter.post('/',createUser)
userRouter.get(`/getUser`,getUser)
userRouter.post('/updateUser',updateUser)

module.exports = userRouter