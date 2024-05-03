const express = require('express')
const userRouter = require('./routes/user.router')
const APIError = require('./utils/APIError')
const cors = require('cors')
const cookieParser = require('cookie-parser')

// MiddleWare
const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({origin:true,credentials: true}))

// Routes
app.use('/user',userRouter)


// Express middleware
app.use(APIError)   
module.exports = app