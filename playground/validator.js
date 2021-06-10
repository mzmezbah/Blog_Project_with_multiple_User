const router = require('express').Router()
const {
    check,
    validationResult

} = require('express-validator')


router.get('/validator', (req, res, next) => {
    res.render('./playground/signup', {
        title: 'validate your data'
    })
})

router.post('/validator',
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
                if(value.length < 5){
                    throw new Error(`password must be greater than five character`)
                }
                return true
            }),//its a custom validator & it took  a callback fn & we can do anything by this fn & validate any 
            
        check('confirmPassword').custom((value,{req}) =>{
            if(value !== req.body.password){
                throw new Error(`password cannot match`)
            }
            return true
        })
    ],
    (req, res, next) => {
        let errors = validationResult(req)
        console.log(errors.isEmpty())//show us is error happen by true or false
        console.log(errors.array())// show errors as an array
        console.log(errors.mapped())//show errors as an object
        let formatter = (error) => error.msg
        console.log(errors.formatWith(formatter).mapped())//manually we can show our error data which type we want ..
    })


    module.exports = router