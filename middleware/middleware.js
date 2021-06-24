const express = require('express')
const morgan = require('morgan')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const flash = require('connect-flash')


//import our custom middleware 

const {
    bindUserWithRequest
} = require('./authMiddleware')
const setLocal = require('./setLocal')


//session store system in database

const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/EXP-Blog',
    collection: 'mySessions',
    expires: 60 * 60 * 1000 * 4
})


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

    }),
    flash(),
    bindUserWithRequest(),
    setLocal()
]

module.exports = app => {
    middleware.forEach(m => {
        app.use(m)
    })
}