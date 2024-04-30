const express = require('express')
const userRouter = require('./routes/user.router')
const APIError = require('./utils/APIError')
const cors = require('cors')

// MiddleWare
const app = express()
app.use(express.json())
app.use(cors())

// Routes
app.use('/user',userRouter)


// Express middleware
app.use(APIError)
module.exports = app