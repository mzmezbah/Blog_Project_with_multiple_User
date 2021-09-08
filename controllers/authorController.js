const Flash = require('../utils/Flash')
const User = require('../models/User')

exports.authorProfileGetController = async (req, res, next) => {

    let userId = req.params.userId

    try {
        let author = await User.findById(userId)
            .populate({
                path: 'profile',
                populate: {
                    path: 'post'
                }
            })

            let posts = author.profile.post

        res.render('pages/explorer/author', {
            title: `Profile of ${author.username}`,
            flashMessage: Flash.getMessage(req),
            author,
            posts
        })
    } catch (e) {
        next(e)
    }

}