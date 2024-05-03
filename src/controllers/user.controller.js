const  jwt  = require("jsonwebtoken");
const user = require("../Model/user.model");
const bcrypt = require('bcrypt')
const AsyncHandler = require("../utils/AsyncHandler");
const ErrorHandler = require("../utils/ErrorHandler");
const product = require("../Model/product.model");
const main = require("../utils/NodeMailer");
require('dotenv').config()
let otp
const signup = AsyncHandler(async(req,res,next)=>{
    const {name,userName,email,password} = req.body
    let response = await user.find({$or:[{userName},{email}]})
    if(response.length){
        if(response[0].email === email)
            return next(new ErrorHandler(409,"User alread exists with this email"))
        return next(new ErrorHandler(409,"User alread exists with this username"))
    }
    otp = Math.floor(Math.random()*9000) + 1000
    const salt = bcrypt.genSaltSync(12)
    const key = bcrypt.hashSync(password,salt)
     response = await user.create({name,userName,email,password:key,otp})
    // const value = jwt.sign({response},process.env.JWT_KEY,{expiresIn:'4h'})
    // res.cookie('AuthToken',value,{maxAge:1000 * 60 * 60*4})
     
    main(name,email,otp)
    
    res.status(201).json({success:true,message:"User created successfully",otp})
})

const login = AsyncHandler(async(req,res,next)=>{
    const {email,password} = req.body
    let response = await user.findOne({email})
    otp = Math.floor(Math.random()*9000) + 1000
    if(!response)
        return next(new ErrorHandler(404,"User doesn't exist"))
    if(bcrypt.compareSync(password,response.password)){
        if(response.verified){
            const value = jwt.sign({response},process.env.JWT_KEY,{expiresIn:'4h'})
            res.cookie('AuthToken',value,{maxAge:1000 * 60 * 60*4})
           return res.status(200).json({success:true,message:"logged in"})
        }
        else{
            response = await user.findOneAndUpdate({email},{otp:otp})
            main(response.userName,email,otp)
            return next(new ErrorHandler(403,"Need to verify"))
        }
       
    }
    next(new ErrorHandler(404,'Incorrect credentials'))
        
    
})

const verify = AsyncHandler(async(req,res,next)=>{
    const {email,password} = req.body
    let response = await user.find({email})
    if(response[0].otp === password){
        response = await user.findOneAndUpdate({email},{verified:true})
            const value = jwt.sign({response},process.env.JWT_KEY,{expiresIn:'4h'})
             res.cookie('AuthToken',value,{maxAge:1000 * 60 * 60*4})
        return res.status(200).json({success:true,message:"verified"})
    }
      
     next(new ErrorHandler(401,"Incorrect OTP"))
    

})

const resendOTP = AsyncHandler(async(req,res,next)=>{
    const {email} = req.body
    otp = Math.floor(Math.random()*9000) + 1000
    const response = await user.findOneAndUpdate({email},{otp:otp})
    main(response.userName,email,otp)
    res.status(200).json({success:true,message:"OTP sent successfully"})
})

const getData = AsyncHandler(async(req,res,next)=>{
    const {page} = req.query
    const limit = 12
    const skip = 12*(page)
    const response = await product.find().limit(limit).skip(skip||0)
    res.status(200).json({success:true,response,limit:limit,total:100,skip:skip||0})
})

const logOut = AsyncHandler(async(req,res,next)=>{
    res.clearCookie('AuthToken')
    res.status(200).json({success:true,message:"Cookies cleared"})
})
module.exports = {signup,getData,logOut,verify,resendOTP,login}