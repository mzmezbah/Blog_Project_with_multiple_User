//name,email,password & profile link

const {
    Schema,
    model
} = require('mongoose')

let userSchema = new Schema({
    name: {
        type: String,
        trim: true,
        maxlength: 30,
        required: true
    },
    email: {
        type: String,
        trim: true,
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