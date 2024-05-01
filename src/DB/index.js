const mongoose = require("mongoose")
require('dotenv').config()
const connectDataBase = async()=>{
    await mongoose.connect(process.env.MONGO_URI)
}

module.exports = connectDataBase