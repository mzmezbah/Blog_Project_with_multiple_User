const {
    body
} = require('express-validator')

module.exports = [
    body('email')
    .not()
    .isEmpty().withMessage('Email Cannot Be an Empty'),
    body('password')
    .not()
    .isEmpty().withMessage('Password Cannot be an Empty')
]