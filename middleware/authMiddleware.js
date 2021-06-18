const User = require('../models/User')

// By this middleware we can get access user object from anywhere of this project..

exports.bindUserWithRequest = ()=> {
    return async (req,res,next) =>{
        if(!req.session.isLoggedIn){
            return next()
        }

        try {
            let user = await User.findById(req.session.user._id)
            req.user = user

            next()
        } catch (e) {
            console.log(e)
            next(e)
        }

    }
}

exports.isAuthenticated = (req,res,next) => {
    if(!req.session.isLoggedIn){
        return res.redirect('/auth/login')
    }
    next()
}

exports.isUnauthenticated = (req,res,next) => {
    if(req.session.isLoggedIn){
        return res.redirect('/dashboard')
    }
    next()
}
