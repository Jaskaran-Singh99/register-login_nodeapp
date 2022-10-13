const express= require('express')
const path = require('path')
const hbs = require('hbs')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const connect = require('./db/connection')
const schema = require('./model/schema')
const app = express()
 
//Middeware
// app.use(express.json()) // For postman/thunderclient
app.use(express.urlencoded({extended:false})) // For html forms this is required

// To Show public files :-
const static_path  = path.join(__dirname,'./public')
app.use(express.static(static_path))

// To show handlebar files
const template_path  = path.join(__dirname,'./templates/views')
const partials_path = path.join(__dirname, './templates/partials')

//Setting the template path
app.set('view engine', 'hbs')
app.set('views', template_path)

 
//Setting the partials path
hbs.registerPartials(partials_path)
app.get('/', (req,res)=>{
    res.render('index')
})

//Routes
app.get('/register', (req, res)=>{ // register
    res.render('register')
}) 

app.post('/register', async (req, res)=>{
    try{
        const  password = req.body.password;
        const  cpassword = req.body.confirmpassword;

        
        if(password == cpassword){
            const register = await schema.create(req.body)
            // const token =  jwt.sign({_id:user._id},'Thisismyjwtsecretstring' )
           
            // res.status(201).json({register})
            res.render('index')
        }
        else{
            res.send('Please check your password')
        }
    }
    catch(error){
        res.status(400).json({msg:error})
    }

})

app.get('/login', (req, res)=>{
    res.render('login')
})
app.post('/login', async (req, res)=>{
    try{
      
        const email = req.body.email
        const password = req.body.password

        const login = await schema.findOne({email})
      
        const compare = await bcryptjs.compare(password, login.password)
        if(compare){
            res.render('index')
        }
        else{
            res.send('The passwords do not match')
        }
    }
    catch(error){
        res.send('Please check your email')
    }
})

const port = 3000
const start = async ()=>{
    try{
        await connect()
        app.listen(port, ()=>{
            console.log(`The server is listening to port ${port}....`)
        })
    }
    catch(error){
        console.log(error)
    }
}

start() 