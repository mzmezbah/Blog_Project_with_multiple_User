const bcrypt = require('bcrypt')

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

    try {
        let hashedPassword = await bcrypt.hash(password, 11)

        let user = new User({
            username,
            email,
            password: hashedPassword
        })

        let createUser = await user.save()

        console.log('Account Create Successfully', createUser)
        res.render('pages/auth/signup', {
            title: 'Create A New Account'
        })

    } catch (e) {
        console.log(e)
        next(e)
    }
}


exports.loginGetController = (req, res, next) => {
    res.render('pages/auth/login', {
        title: 'Login to Your Account'
    })
}


exports.loginPostController = async (req, res, next) => {
    let {
        email,
        password
    } = req.body

    try {
        let user = await User.findOne({
            email
        })

        if (!user) {
            return res.json({
                message: 'Invalid Credential'
            })
        }

        let match = await bcrypt.compare(password, user.password)
        if (!match) {
            res.json({
                message: 'Invalid Credential'
            })
        }
        console.log('Successfully Logged In', user)
        res.render('pages/auth/login', {
            title: 'Login Your Account'
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.logoutController = (req, res, next) => {

}