const authRoute = require('./authRoute')
const dashboardRoute = require('./dashboardRoute')
const uploadRoute = require('./uploadRoutes')
const validatorRoute = require('../playground/play') //for practice


let routes = [
    {
        path:'/auth',
        controllerName: authRoute
    },
    {
        path:'/dashboard',
        controllerName: dashboardRoute
    },
    {
        path: '/uploads',
        controllerName: uploadRoute
    },
    {
        path: '/playground',
        controllerName: validatorRoute
    },//just for practice
    {
        path:'/',
        controllerName: (req, res) => {

            // res.render('pages/auth/signup', {title: 'Create a new account'})
            res.redirect('/auth/signup')
        }
    }

]

module.exports = (app) => {
    routes.forEach( r => {
        // console.log(r)
        if(r.path === '/'){
            app.get(r.path, r.controllerName)
        }else{
            app.use(r.path, r.controllerName)
        }
    })
}

