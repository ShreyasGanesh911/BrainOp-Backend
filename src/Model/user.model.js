const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{
        type:String,
        required:[true,"UserName not provided"],
        unique:[true,"UserName is already taken"]
    },
    email:{
        type:String,
        required:[true,"email not provided"],
        unique:[true,"Email is already taken"]
    },
    name:{
        type:String,
        required:[true,"Name not provided"]
    },
    password:{
        type:String,
        required:[true,"password not provided"]
    },
    verified:{
        type:Boolean,
        default:false
    },
    otp:Number

})

const user = mongoose.model('user',userSchema)

module.exports = user