require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const config = require('config')


//import route

const setRoutes = require('./routes/routes')

//import middleware

const setMiddleware = require('./middleware/middleware')

//import practice route

// const validatorRoute = require('./playground/validator')//must be delete later bcz its for practice validator

const app = express()

// console.log(app.get('env'))
// console.log(config.get('name'))

//view engine setup

app.set('view engine', 'ejs')
app.set('views', 'views')

// set middleware array from middleware.js file

setMiddleware(app)

//set route from routes.js 

setRoutes(app)

// app.use('/playground', validatorRoute)//must be delete later its for practice validator



let PORT = process.env.PORT

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

    })