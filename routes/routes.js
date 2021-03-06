const authRoute = require('./authRoute')
const dashboardRoute = require('./dashboardRoute')
const uploadRoute = require('./uploadRoutes')
const validatorRoute = require('../playground/play') //for practice
const postRoute = require('./postRoute')
const exploreRoute = require('./exploreRoute')
const searchRoute = require('./searchRoute')
const authorRoute = require('./authorRoute')

const apiRoute = require('../api/routes/apiRoute')


let routes = [{
        path: '/auth',
        controllerName: authRoute
    },
    {
        path: '/dashboard',
        controllerName: dashboardRoute
    },
    {
        path: '/uploads',
        controllerName: uploadRoute
    },
    {
        path: '/posts',
        controllerName: postRoute
    },
    {
        path: '/api',
        controllerName: apiRoute
    },
    {
        path: '/explore',
        controllerName: exploreRoute
    },
    {
        path: '/search',
        controllerName: searchRoute
    },
    {
        path: '/author',
        controllerName: authorRoute
    },
    {
        path: '/playground',
        controllerName: validatorRoute
    }, //just for practice
    {
        path: '/',
        controllerName: (req, res) => {
            res.redirect('/explore')
        }
    }

]

module.exports = (app) => {
    routes.forEach(r => {
        // console.log(r)
        if (r.path === '/') {
            app.get(r.path, r.controllerName)
        } else {
            app.use(r.path, r.controllerName)
        }
    })
}