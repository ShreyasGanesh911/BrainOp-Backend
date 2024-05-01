const express = require('express')
const { signup,getData } = require('../controllers/user.controller')
const Auth = require('../middlewares/auth')

const userRouter = express.Router()

userRouter.post('/signup',signup)
userRouter.get("/test",Auth,getData)
module.exports = userRouter