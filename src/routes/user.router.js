const express = require('express')
const { signup,getData,logOut } = require('../controllers/user.controller')
const Auth = require('../middlewares/auth')

const userRouter = express.Router()

// Routes
userRouter.post('/signup',signup)
userRouter.get("/data",Auth,getData)
userRouter.get('/logout',logOut)
module.exports = userRouter