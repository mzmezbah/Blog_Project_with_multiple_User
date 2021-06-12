const {
    body
} = require('express-validator')

const User = require('../../models/User')

module.exports = [
    body('username')
    .isLength({
        min: 3,
        max: 15
    }).withMessage('Username Must be between 3 to 15 characters')
    .custom(async username => {
        let user = await User.findOne({
            username
        })
        if (user) {
            return Promise.reject('Username is Already Used')
        }
        return true
    })
    .trim(),
    body('email')
    .isEmail().withMessage('Provide a Valid Email')
    .custom(async email => {
        let user = await User.findOne({
            email
        })
        if (user) {
            return Promise.reject('Email is Already Used')
        }
        return true
    })
    .normalizeEmail(),
    body('password')
    .isLength({
        min: 5
    }).withMessage('Password Must be Greater than 5 character'),
    body('confirmPassword')
    .isLength({
        min: 5
    }).withMessage('Password Must be Greater than 5 character')
    .custom((confirmPassword, {
        req
    }) => {
        if (confirmPassword !== req.body.password) {
            throw new Error('Password Cannot Be Match')
        }
        return true
    })

]