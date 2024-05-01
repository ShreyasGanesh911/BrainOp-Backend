const  jwt  = require("jsonwebtoken");
const user = require("../Model/user.model");
const bcrypt = require('bcrypt')
const AsyncHandler = require("../utils/AsyncHandler");
const ErrorHandler = require("../utils/ErrorHandler");
const product = require("../Model/product.model");
const main = require("../utils/NodeMailer");
require('dotenv').config()
const signup = AsyncHandler(async(req,res,next)=>{
    const {name,userName,email,password} = req.body
    let response = await user.find({$or:[{userName},{email}]})
    const salt = bcrypt.genSaltSync(12)
    const key = bcrypt.hashSync(password,salt)
     response = await user.create({name,userName,email,password:key})
    console.log(response)
    const value = jwt.sign({response},process.env.JWT_KEY,{expiresIn:'4h'})
    res.cookie('AuthToken',value,{maxAge:1000 * 60 * 60*4})
    main(name,email)
    res.status(201).json({success:true,message:"User created successfully"})
})

const getData = AsyncHandler(async(req,res,next)=>{
    const {limit,skip} = req.query
    const response = await product.find().limit(limit||20).skip(skip||0)
    res.status(200).json({success:true,response,limit:limit||20,total:100,skip:skip||0})
})

module.exports = {signup,getData}