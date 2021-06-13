const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)

var store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/EXP-Blog',
    collection: 'mySessions',
    expires: 60*60*1000*4
  })

//import route

const authRoute = require('./routes/authRoute')

// const validatorRoute = require('./playground/validator')//must be delete later bcz its for practice validator



const app = express()

//view engine setup

app.set('view engine', 'ejs')
app.set('views', 'views')

//middleware array

const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({
        extended: true
    }),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || 'SECRET_KEY',
        resave: false,
        saveUninitialized: false,
        store: store    
        
   })
]

app.use(middleware)


app.use('/auth', authRoute)

// app.use('/playground', validatorRoute)//must be delete later its for practice validator

app.get('/', (req, res) => {

    res.render('pages/auth/signup', {title: 'Create a new account'})
    res.json({
        message: 'Hello World!'
    })
})


let PORT = process.env.PORT || 8080 

mongoose.connect('mongodb://localhost:27017/EXP-Blog', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })  
    .then((result) => {
        app.listen(PORT, () => {
            console.log(`server is running on PORT ${PORT}`)
        })
    }).catch((err) => {
        console.log(err)

    });