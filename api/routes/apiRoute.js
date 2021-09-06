const router = require('express').Router()

const {
    isAuthenticated
} = require('../../middleware/authMiddleware')
const {
    bookmarksGetController
} = require('../controllers/bookmarkController')

const {
    commentPostController,
    replyCommentPostController
} = require('../controllers/commentsController')
const {
    likesGetController,
    dislikesGetController
} = require('../controllers/likeDislikeController')


router.post('/comment/:postId', isAuthenticated, commentPostController)

router.post('/comment/replies/:commentId', isAuthenticated, replyCommentPostController)

router.get('/likes/:postId', isAuthenticated, likesGetController)

router.get('/dislikes/:postId', isAuthenticated, dislikesGetController)

router.get('/bookmarks/:postId', isAuthenticated, bookmarksGetController)



module.exports = router