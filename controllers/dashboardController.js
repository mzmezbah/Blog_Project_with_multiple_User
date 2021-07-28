const {
    validationResult
} = require('express-validator')
const errorFormatter = require('../utils/validatorErrorFormatter')
const Flash = require('../utils/Flash')
const User = require('../models/User')
const Profile = require('../models/Profile')
const { ResultWithContext } = require('express-validator/src/chain')

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
            flashMessage: Flash.getMessage(req),
            error: {}
        })

    } catch (e) {
        next(e)
    }

}


exports.createProfilePostController = async (req, res, next) => {
    let errors = validationResult(req).formatWith(errorFormatter)

    if (!errors.isEmpty()) {
        return res.render('pages/dashboard/create-profile', {
            title: 'Create Your Profile',
            flashMessage: Flash.getMessage(req),
            error: errors.mapped()
        })
    }

    let {
        name,
        title,
        bio,
        website,
        facebook,
        twitter,
        github
    } = req.body
    try {
        let profile = new Profile({
            user: req.user._id,
            name,
            title,
            bio,
            profilePic: req.user.profilePic,
            link: {
                website: website || '',
                facebook: facebook || '',
                twitter: twitter || '',
                github: github || ''
            },
            post: [],
            bookmark: []
        })

        let createdProfile = await profile.save()

        await User.findOneAndUpdate({
            _id: req.user._id
        }, {
            $set: {
                profile: createdProfile._id
            }
        })

        req.flash('success', 'profile created successfully')
        res.redirect('/dashboard')

    } catch (e) {
        next(e)
    }

}


exports.editProfileGetController = async (req, res, next) => {
    try {
        let profile = await Profile.findOne({
            user: req.user._id
        })
        if (!profile) {
            return res.redirect('pages/dashboard/create-profile')
        }
        res.render('pages/dashboard/edit-profile', {
            title: 'Edit Your Profile',
            error: {},
            flashMessage: Flash.getMessage(req),
            profile
        })
    } catch (e) {
        next(e)
    }
}

exports.editProfilePostController = async (req, res, next) => {
    let errors = validationResult(req).formatWith(errorFormatter)
    let {
        name,
        title,
        bio,
        website,
        facebook,
        twitter,
        github
    } = req.body

    if (!errors.isEmpty()) {
        return res.render('pages/dashboard/edit-profile', {
            title: 'Edit Your Profile',
            flashMessage: Flash.getMessage(req),
            error: errors.mapped(),
            profile: {
                name,
                title,
                bio,
                link: {
                    website,
                    facebook,
                    twitter,
                    github
                }
            }
        })

    }
    
    try {
        let profile = {
            name,
            title,
            bio,
            link: {
                website: website || '',
                facebook: facebook || '',
                twitter: twitter || '',
                github: github || ''
            }
        }

        let updatedProfile = await Profile.findOneAndUpdate({
            user: req.user._id
        }, {
            $set: profile
        }, {
            new: true
        })

        req.flash('success', 'Profile Updated Successfully')
        res.render('pages/dashboard/edit-profile', {
            error: {},
            flashMessage: Flash.getMessage(req),
            title: 'Edit Your Profile',
            profile: updatedProfile
        })
    } catch (e) {
        next(e)
    }   


}