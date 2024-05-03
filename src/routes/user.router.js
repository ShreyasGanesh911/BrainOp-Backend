const express = require('express')
const { signup,getData,logOut, verify, resendOTP, login } = require('../controllers/user.controller')
const Auth = require('../middlewares/auth')

const userRouter = express.Router()

// Routes
userRouter.post('/signup',signup)
userRouter.get("/data",Auth,getData)
userRouter.get('/logout',logOut)
userRouter.post('/verify',verify)
userRouter.post('/resend',resendOTP)
userRouter.post('/login',login)
module.exports = userRouter