const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

//import route

const authRoute = require('./routes/authRoute')



const app = express()

//view engine setup

app.set('view engine', 'ejs')
app.set('views', 'views')

//middleware array

const middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({extended:true}),
    express.json()
]

app.use(middleware)

app.use('/auth', authRoute)

app.get('/', (req, res) => {

    // res.render('pages/auth/signup', {title: 'Create a new account'})
    res.json({
        message: 'Hello World!'
    })
})


let PORT = process.env.PORT || 8080

app.listen(PORT, ()=>{
    console.log(`server is running on PORT ${PORT}`)
})