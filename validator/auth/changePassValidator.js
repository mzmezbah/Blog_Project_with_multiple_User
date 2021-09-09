const {
    body
} = require('express-validator')


module.exports = [
    body('oldPassword')
    .not().isEmpty().withMessage('Field cannot be Empty')
    .isLength({
        min: 5
    }).withMessage('Password must be Greater than 5 chars'),

    body('newPassword')
    .not().isEmpty().withMessage('Field cannot Be Empty')
    .isLength({
        min: 5
    }).withMessage('Password must be Greater than 5 chars'),

    body('confirmPassword')
    .not().isEmpty().withMessage('Field cannot Be Empty')
    .isLength({
        min: 5
    }).withMessage('Password must be Greater than 5 chars')
    .custom((confirmPassword, {
        req
    }) => {
        if (confirmPassword !== req.body.newPassword) {
            throw new Error('Password cannot be Matched')
        }
        return true
    })
]