const jwt = require("jsonwebtoken")
const ErrorHandler = require("../utils/ErrorHandler")
const user = require("../Model/user.model")
const AsyncHandler = require("../utils/AsyncHandler")
require('dotenv').config()

const Auth = AsyncHandler(async(req,res,next)=>{
    const {AuthToken} = req.cookies
    //console.log(AuthToken)
    jwt.verify(AuthToken,process.env.JWT_KEY,async(err,users)=>{
        if(err){
            res.clearCookie("AuthToken")
            return next(new ErrorHandler(401,"Invalid authToken, need to login again"))
        }
        console.log(users.response._id)
        const response = await user.findOne({_id:users.response._id})
        if(!response)
            return next(new ErrorHandler(404,"User not found"))
        req.user = users
        next()
    })
})

module.exports = Auth