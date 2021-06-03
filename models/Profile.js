//user ,title, bio, profilePic, socialLink: {fb,twitter}, posts,bookmarks

const {
    Schema,
    model
} = require('mongoose')

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        trim: true,
        maxlength: 200,
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 500,
    },
    profilePic: String,
    link: {
        website: String,
        facebook: String,
        twitter: String,
        github: String
    },
    post: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }],
    bookmark: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]

}, {
    timestamps: true
})

const Profile = model('Profile', profileSchema)

module.exports = Profile