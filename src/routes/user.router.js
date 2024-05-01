const express = require('express')
const { signup,getData } = require('../controllers/user.controller')
const Auth = require('../middlewares/auth')
const AsyncHandler = require('../utils/AsyncHandler')

const userRouter = express.Router()

// Routes
userRouter.post('/signup',signup)
userRouter.get("/data",Auth,getData)

module.exports = userRouter