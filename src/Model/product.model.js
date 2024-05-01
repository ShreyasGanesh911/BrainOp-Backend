const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    id:Number,
    title:String,
    description:String,
    price:Number,
    discountPercentage:Number,
    rating:Number,
    stock:Number,
    brand:String,
    thumbnail:String,
    images:{
        type: [String],
      }


    })

    const product = mongoose.model('product',productSchema)
    module.exports = product