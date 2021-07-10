const router = require('express').Router()

const {
    isAuthenticated
} = require('../middleware/authMiddleware')

const upload = require('../middleware/uploadMiddleware')

const {
    uploadProfilePic
} = require('../controllers/uploadController')


router.post('/profilePic', isAuthenticated, upload.single('profilePic'), uploadProfilePic)



module.exports = router