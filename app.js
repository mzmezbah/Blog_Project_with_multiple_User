require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const config = require('config')

//import route

const setRoutes = require('./routes/routes')

//import middleware

const setMiddleware = require('./middleware/middleware')

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

app.use((req, res, next) => {
    let error = new Error('404 page not found')
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    if (error.status == 404) {
        return res.render('pages/error/404', {
            flashMessage: {}
        })
    }
    console.log(error)
    res.render('pages/error/500', {flashMessage: {}})
})

let PORT = process.env.PORT || 8080

mongoose.connect('mongodb://localhost:27017/EXP-Blog', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    })
    .then((result) => {
        app.listen(PORT, () => {
            console.log(`server is running on PORT ${PORT}`)
        })
    }).catch((err) => {
        console.log(err)

    })