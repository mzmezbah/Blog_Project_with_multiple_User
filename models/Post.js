//title, body, author, tags, thumbnail, readTime, likes, dislikes, comments

const {
    Schema,
    model,
    SchemaTypeOptions
} = require('mongoose')

const postSchema = new Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 200
    },
    body: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    thumbnail: String,
    readTime: String,
    likes: [Schema.Types.ObjectId],
    dislikes;
    [Schema.Types.ObjectId],
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]

}, {
    timestamps: true
})

const Post = model('Post', postSchema)
module.exports = Post