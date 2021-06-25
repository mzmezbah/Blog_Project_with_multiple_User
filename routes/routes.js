const authRoute = require('./authRoute')
const dashboardRoute = require('./dashboardRoute')
// const validatorRoute = require('../playground/validator')


let routes = [
    {
        path:'/auth',
        controllerName: authRoute
    },
    {
        path:'/dashboard',
        controllerName: dashboardRoute
    },
    // {
    //     path: '/playground',
    //     controllerName: validatorRoute
    // },//just for practice
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
        app.use(r.path, r.controllerName)
    })
}

