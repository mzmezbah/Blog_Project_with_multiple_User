const router = require('express').Router()

const {
    signupGetController,
    signupPostController,
    loginGetController,
    loginPostController,
    logoutController
} = require('../controllers/authController')

const signupValidator = require('../validator/auth/signupValidator')
const loginValidator = require('../validator/auth/loginValidator')

const {
    isUnauthenticated
} = require('../middleware/authMiddleware')


router.get('/signup', isUnauthenticated, signupGetController)
router.post('/signup', isUnauthenticated, signupValidator, signupPostController)

router.get('/login', isUnauthenticated, loginGetController)
router.post('/login', isUnauthenticated, loginValidator, loginPostController)

router.get('/logout', logoutController)

module.exports = router