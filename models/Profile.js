//user ,title, bio, profilePic, socialLink: {fb,twitter}, posts,bookmarks

const {
    Schema,
    model
} = require('mongoose')

// const User = require('./User')

// const Post = require('./Post')

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        trim: true,
        maxlength: 50,
        required: true
    },
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 100
    },
    bio: {
        type: String,
        trim: true,
        maxlength: 500,
        required: true
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
    bookmarks: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]

}, {
    timestamps: true
})

const Profile = model('Profile', profileSchema)

module.exports = Profile