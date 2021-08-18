const Profile = require('../../models/Profile')

exports.bookmarksGetController = async (req, res, next) => {
    let {
        postId
    } = req.params

    if (!req.user) {
        return res.status(403).json({
            error: 'You are not an authenticated user'
        })
    }

    let bookmark = null
    let userId = req.user._id

    try {
        let profile = await Profile.findOne({
            user: userId
        })

        if (profile.bookmarks.includes(postId)) {
            await Profile.findOneAndUpdate({
                user: userId
            }, {
                $pull: {
                    'bookmarks': postId
                }
            })
            bookmark = false
        } else {
            await Profile.findOneAndUpdate({
                user: userId
            }, {
                $push: {
                    'bookmark': postId
                }
            })
            bookmark = true
        }

        res.status(200).json({
            bookmark
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: 'Server Error Occurred'
        })
    }
}