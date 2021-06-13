const bcrypt = require('bcrypt')

const User = require('../models/User')
const {
    validationResult
} = require('express-validator')
const formatter = require('../utils/validatorErrorFormatter')
const { set } = require('mongoose')


exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup', {
        title: 'Create A New Account',
        error: {},
        value: {}
    })
}


exports.signupPostController = async (req, res, next) => {
    let {
        username,
        email,
        password
    } = req.body

    let errors = validationResult(req).formatWith(formatter)
    if (!errors.isEmpty()) {
        return res.render('pages/auth/signup', {
            title: 'Create A New Account',
            error: errors.mapped(),
            value: {
                username,
                email,
                password
            }
        })
    }
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
            title: 'Create A New Account',
            error: {},
            value: {}
        })

    } catch (e) {
        console.log(e)
        next(e)
    }
}


exports.loginGetController = (req, res, next) => {
    console.log(req.session.isLoggedIn, req.session.user)
    res.render('pages/auth/login', {
        title: 'Login to Your Account',
        error: {}
    })
    
}


exports.loginPostController = async (req, res, next) => {
    let {
        email,
        password
    } = req.body

    let errors = validationResult(req).formatWith(formatter)
    if (!errors.isEmpty()) {
        console.log(errors)
        return res.render('pages/auth/login', {
            title: 'LogIn to Your Account',
            error: errors.mapped()
        })
    }
    // console.log(errors)
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
        req.session.isLoggedIn = true,
        req.session.user = user
        res.render('pages/auth/login', {
            title: 'Login Your Account',
            error: {}
        })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.logoutController = (req, res, next) => {

}