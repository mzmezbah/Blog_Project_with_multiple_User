const User = require('../models/User')

exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup', {
        title: 'Create A New Account'
    })
}

exports.signupPostController = async (req, res, next) => {
    let {
        username,
        email,
        password
    } = req.body

    let user = new User({
        username,
        email,
        password
    })

    try {
        let createUser = await user.save()
        console.log('Account Create Successfully', createUser)
        res.render('pages/auth/signup', {title: 'Create A New Account'})
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.loginGetController = (req, res, next) => {

}

exports.loginPostController = (req, res, next) => {

}

exports.logoutController = (req, res, next) => {

}