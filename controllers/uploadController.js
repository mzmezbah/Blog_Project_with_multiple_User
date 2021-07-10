const User = require('../models/User')
const Profile = require('../models/Profile')

exports.uploadProfilePic = async (req, res, next) => {

    if (req.file) {
        try {
            let profile = await Profile.findOne({
                user: req.user._id
            })
            let profilePic = `/uploads/${req.file.filename}`

            if (profile) {
                await Profile.findOneAndUpdate({
                    user: req.user._id
                }, {
                    $set: {
                        profilePic
                    }
                })
            }

            await User.findOneAndUpdate({
                _id: req.user._id
            }, {
                set: {
                    profilePic
                }
            })
            res.status(200).json({
                profilePic
            })
            
        } catch (e) {
            res.status(500).json({
                profilePic: req.user.profilePic
            })
        }
    } else {
        res.status(500).json({
            profilePic: req.user.profilePic
        })
    }

}