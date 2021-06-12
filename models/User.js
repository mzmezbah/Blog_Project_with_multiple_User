//name,email,password & profile link

const {
    Schema,
    model
} = require('mongoose')

// const Profile = require('./Profile')

let userSchema = new Schema({
    username: {
        type: String,
        trim: true,
        maxlength: 15,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        //here type is a ObjectId of reference Schema  & ref is schema name which schema is linked here..
        type: Schema.Types.ObjectId,
        ref: 'Profile'
    }
}, {
    timestamps: true    
})

const User = model('User', userSchema)

module.exports = User