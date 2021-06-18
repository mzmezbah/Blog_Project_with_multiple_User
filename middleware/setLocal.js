//This middleware , we set here some data as local by "res.locals" which can access views folder directly..

module.exports = () => {
    return (req,res,next) => {
        res.locals.user = req.user
        res.locals.isLoggedIn = req.session.isLoggedIn
        
        next()
    }
}