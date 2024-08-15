const express = require('express');
const { login, logOut } = require('../controllers/authController');
const authRouter = express.Router();
authRouter.post('/login',login)
authRouter.post('/logout',logOut)
module.exports = authRouter