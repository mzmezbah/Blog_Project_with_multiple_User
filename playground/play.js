const router = require('express').Router()
const {
    check,
    validationResult

} = require('express-validator')

const Flash = require('../utils/Flash')
const upload = require('../middleware/uploadMiddleware')
//import npm console system

const testConsole = require('debug')('app:test') //this extra fn , you can use any text instead of app:test.

const dbConsole = require('debug')('app:db') //you can set different console for easy to your code & debug..

testConsole('hello, this console log is by using debug module') //its a console.log() but for showing this we need to set environment variable in our terminal like  for Powershell $env:DEBUG='app:test' for terminal set DEBUG='app:test'

dbConsole('this console is for show error or something in database') //for showing this on console is same process..but if you can see all type of console of same name like 'app' then type shortcut for Powershell $env:DEBUG='app:*' for terminal set DEBUG='app:*'




router.get('/play', (req, res, next) => {

    console.log(Flash.getMessage(req))

    res.render('./playground/play', {
        title: 'practice with data',
        flashMessage: {}
    })
})

router.post('/play',
    upload.single('my-file'),
    [
        check('username')
        .not()
        .isEmpty()
        .withMessage(`username cannot be empty`)
        .isLength({
            max: 20
        })
        .withMessage(`username cannot longer than 20 character`),

        check('email')
        .isEmail()
        .withMessage(`Enter your valid address`),

        check('password')
        .custom(value => {
            if (value.length < 5) {
                throw new Error(`password must be greater than five character`)
            }
            return true
        }), //its a custom validator & it took  a callback fn & we can do anything by this fn & validate any 

        check('confirmPassword').custom((value, {
            req
        }) => {
            if (value !== req.body.password) {
                throw new Error(`password cannot match`)
            }
            return true
        })
    ],
    (req, res, next) => {
        let errors = validationResult(req)
        console.log(errors.isEmpty()) //show us is error happen by true or false
        console.log(errors.array()) // show errors as an array
        console.log(errors.mapped()) //show errors as an object
        let formatter = (error) => error.msg
        console.log(errors.formatWith(formatter).mapped()) //manually we can show our error data which type we want .

        //pratice flash message for alert success or failure
        if (!errors.isEmpty()) {
            req.flash('fail', 'There is something error happen')
        } else {
            req.flash('success', 'There is no error happen')
        }
        res.redirect('/playground/play')
    })


module.exports = router