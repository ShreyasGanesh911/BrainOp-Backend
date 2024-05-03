const jwt = require("jsonwebtoken")
const ErrorHandler = require("../utils/ErrorHandler")
const user = require("../Model/user.model")
const AsyncHandler = require("../utils/AsyncHandler")
require('dotenv').config()

const Auth = AsyncHandler(async(req,res,next)=>{
    const {AuthToken} = req.cookies
    if(!AuthToken)
        return next(new ErrorHandler(401,"No token exists"))
    console.log("AuthToken",AuthToken)
    jwt.verify(AuthToken,process.env.JWT_KEY,async(err,users)=>{
        if(err){
            console.log(err)
            res.clearCookie("AuthToken")
            return next(new ErrorHandler(401,"Invalid authToken, need to login again"))
        }
        const response = await user.findOne({_id:users.response._id})
        if(!response)
            return next(new ErrorHandler(401,"Invalid,User not found"))
        req.user = users
        next()
    })
})

module.exports = Auth