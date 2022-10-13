const mongoose = require('mongoose')
const url = 'mongodb+srv://jaskaranSingh:Jaskaran70870@cluster0.41sr1.mongodb.net/?retryWrites=true&w=majority'

const connect = ()=>{
    return mongoose.connect(url,{
        useNewUrlParser:true,
        // useCreateIndex:true,
        // useFindAndModify:false,
        useUnifiedTopology:true
    })
}

module.exports = connect
