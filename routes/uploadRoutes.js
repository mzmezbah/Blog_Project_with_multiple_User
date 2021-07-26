const router = require('express').Router()

const {
    isAuthenticated
} = require('../middleware/authMiddleware')

const upload = require('../middleware/uploadMiddleware')

const {
    uploadProfilePic,
    removeProfilePic
} = require('../controllers/uploadController')


router.post('/profilePic', isAuthenticated, upload.single('profilePic'), uploadProfilePic)

router.delete('/profilePic', isAuthenticated, removeProfilePic)



module.exports = router