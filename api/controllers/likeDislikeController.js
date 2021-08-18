const Post = require('../../models/Post')

exports.likesGetController = async (req, res, next) => {
    let {
        postId
    } = req.body
    let liked = null
   

    if (!req.user) {
        res.status(403).json({
            error: 'You are not an authenticated user'
        })
    }

    let userId = req.user._id

    try {
        let post = await Post.findById(postId)

        if (post.dislike.includes(userId)) {
            await Post.findOneAndUpdate({
                _id: postId
            }, {
                $pull: {
                    'dislikes': userId
                }
            })
        }
        if (post.likes.includes(userId)) {
            await Post.findOneAndUpdate({
                _id: postId
            }, {
                $pull: {
                    'likes': userId
                }
            })
            liked: false
        } else {
            await Post.findOneAndUpdate({
                _id: postId
            }, {
                $push: {
                    'likes': userId
                }
            })
            liked: true
        }

        let updatedPost = await Post.findById(postId)

        res.status(200).json({
            liked,
            totalLikes: updatedPost.likes.length,
            totalDislikes: updatedPost.dislikes.length

        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: 'Server Error Occurred'
        })
    }
}

exports.dislikesGetController = (req, res, next) => {
    let {
        postId
    } = req.params
    let disliked = null
    let userId = req.user._id

    if (!req.user) {
        return res.status(403).json({
            error: 'You are not an authenticated user'
        })
    }

    let userId = req.user._id

    try {
        let post = await Post.findById(postId)
        if (post.likes.includes(userId)) {
            await Post.findOneAndUpdate({
                _id: postId
            }, {
                $pull: {
                    'likes': userId
                }
            })
        }

        if (post.dislikes.includes(postId)) {
            await Post.findOneAndUpdate({
                _id: postId
            }, {
                $pull: {
                    'dislikes': userId
                }
            })
            disliked: false
        } else {
            await Post.findOneAndUpdate({
                _id: postId
            }, {
                $push: {
                    'dislikes': userId
                }
            })
            disliked: true
        }

        let updatedPost = await Post.findById(postId)

        return res.status(200).json({
            disliked,
            totalDislikes: updatedPost.dislikes.length,
            totalLikes: updatedPost.likes.length
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: 'Server Error Occurred'
        })
    }
}