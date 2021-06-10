const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

//import route

const authRoute = require('./routes/authRoute')

const validatorRoute = require('./playground/validator')//must be delete later



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
    express.json()
]

app.use(middleware)


app.use('/auth', authRoute)

app.use('/playground', validatorRoute)//must be delete later

app.get('/', (req, res) => {

    res.render('pages/auth/signup', {title: 'Create a new account'})
    res.json({
        message: 'Hello World!'
    })
})


let PORT = process.env.PORT || 8080 

mongoose.connect('mongodb://localhost/EXP-Blog', {
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