const mongoose = require('mongoose')
const bcryptjs = require('bcryptjs')


const schema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    age:{
        type:Number,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:Number,
        required:true,
        unique:true
    },
    gender:{
        type:String,
        required:true
    }
})



schema.pre('save', async function(next){
    console.log(this.password)
    this.password = await bcryptjs.hash(this.password, 10)
    console.log(this.password)
    next()
}) 
 
module.exports = new mongoose.model('Register', schema) 