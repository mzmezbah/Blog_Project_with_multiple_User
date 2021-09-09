const bcrypt = require('bcrypt')

const User = require('../models/User')
const {
    validationResult
} = require('express-validator')
const formatter = require('../utils/validatorErrorFormatter')

const {
    set
} = require('mongoose')

const Flash = require('../utils/Flash')


exports.signupGetController = (req, res, next) => {
    res.render('pages/auth/signup', {
        title: 'Create A New Account',
        error: {},
        value: {},
        flashMessage: Flash.getMessage(req)
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
        req.flash('fail', 'Please Check Your Form.')
        return res.render('pages/auth/signup', {
            title: 'Create A New Account',
            error: errors.mapped(),
            value: {
                username,
                email,
                password
            },
            flashMessage: Flash.getMessage(req)
        })
    }
    try {
        let hashedPassword = await bcrypt.hash(password, 11)

        let user = new User({
            username,
            email,
            password: hashedPassword
        })

        await user.save()
        req.flash('success', 'User Created Successfully!')
        res.redirect('/auth/login')

    } catch (e) {
        next(e)
    }
}


exports.loginGetController = (req, res, next) => {

    res.render('pages/auth/login', {
        title: 'Login to Your Account',
        error: {},
        flashMessage: Flash.getMessage(req)
    })

}


exports.loginPostController = async (req, res, next) => {
    let {
        email,
        password
    } = req.body

    let errors = validationResult(req).formatWith(formatter)

    if (!errors.isEmpty()) {
        req.flash('fail', 'Please Check Your Form.')
        console.log(errors)
        return res.render('pages/auth/login', {
            title: 'LogIn to Your Account',
            error: errors.mapped(),
            flashMessage: Flash.getMessage(req)

        })
    }
    // console.log(errors)
    try {
        let user = await User.findOne({
            email
        })

        if (!user) {
            req.flash('fail', 'Provide Valid User ID.')
            return res.render('pages/auth/login', {
                title: 'LogIn to Your Account',
                error: {},
                flashMessage: Flash.getMessage(req)

            })
        }

        let match = await bcrypt.compare(password, user.password)
        if (!match) {
            req.flash('fail', 'Provide Valid User ID.')
            return res.render('pages/auth/login', {
                title: 'LogIn to Your Account',
                error: {},
                flashMessage: Flash.getMessage(req)

            })
        }
        req.session.isLoggedIn = true,
            req.session.user = user,

            req.session.save(err => {
                if (err) {
                    console.log(err)
                    return next(err)
                }
                req.flash('success', 'Successfully Logged In!')
                res.redirect('/dashboard')
            })

        // res.render('pages/auth/login', {
        //     title: 'Login Your Account',
        //     error: {}
        // })

    } catch (e) {
        next(e)
    }
}

exports.logoutController = (req, res, next) => {
    req.session.destroy(err => {
        if (err) {
            return next(err)
        }
        return res.redirect('/auth/login')
    })
}


exports.changePassGetController = (req, res, next) => {
    res.render('pages/auth/changePassword', {
        title: 'Change Your Password',
        flashMessage: Flash.getMessage(req),
        error: {}
    })
}


exports.changePassPostController = async (req, res, next) => {
    let {
        oldPassword,
        newPassword,
        confirmPassword
    } = req.body

    let errors = validationResult(req).formatWith(formatter)

    if (!errors.isEmpty()) {
        req.flash('fail', 'Please Input a Valid Password')
        return res.render('pages/auth/changePassword', {
            title: 'Change Your Password',
            error: errors.mapped(),
            flashMessage: Flash.getMessage(req)
        })
    }

    if (newPassword !== confirmPassword) {
        req.flash('fail', 'Password does not Match')
       return res.redirect('/auth/changePassword')
    }

    try {

        let match = await bcrypt.compare(oldPassword, req.user.password)
        if (!match) {
            req.flash('fail', 'Invalid Old Password')
            res.redirect('/auth/changePassword')
        }

        let hash = await bcrypt.hash(newPassword, 11)

        await User.findOneAndUpdate({
            _id: req.user._id
        }, {
            $set: {
                password: hash
            }
        })
        req.flash('success', 'Password Updated Successfully!')
        return res.redirect('/auth/changePassword')
    } catch (e) {
        next(e)
    }

}