const Flash = require('../utils/Flash')
const Profile = require('../models/Profile')

exports.dashboardGetController = async (req, res, next) => {

    try {
        let profile = await Profile.findOne({
            user: req.user._id
        })

        if (profile) {
            return res.render('pages/dashboard/dashboard', {
                title: 'MY Dashboard',
                flashMessage: Flash.getMessage(req)
            })
        }

        res.redirect('/dashboard/create-profile')

    } catch (e) {
        next(e)
    }
}


exports.createProfileGetController = async (req, res, next) => {

    try {

        let profile = await Profile.findOne({
            user: req.user._id
        })

        if (profile) {
            return res.redirect('/dashboard/edit-profile')
        }

        res.render('pages/dashboard/create-profile', {
            title: 'Create Your Profile',
            flashMessage: Flash.getMessage(req)
        })

    } catch (e) {
        next(e)
    }

}


exports.createProfilePostController = (req,res,next) => {
    next()
}


exports.editProfileGetController = (req,res,next) => {
    next()
}

exports.editProfilePostController = (req,res,next) => {
    next()
}