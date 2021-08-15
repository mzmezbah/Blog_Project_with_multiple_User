const Flash = require('../utils/Flash')
const {
    validationResult
} = require('express-validator')
const errorFormatter = require('../utils/validatorErrorFormatter')
const readingTime = require('reading-time')

let Post = require('../models/Post')
let Profile = require('../models/Profile')
const { next } = require('cheerio/lib/api/traversing')

exports.createPostGetController = (req, res, next) => {
    return res.render('pages/dashboard/post/create-post', {
        title: 'Create New Post',
        error: {},
        flashMessage: Flash.getMessage(req),
        value: {}
    })

}

exports.createPostPostController = async (req, res, next) => {

    let {
        title,
        body,
        tags
    } = req.body

    let errors = validationResult(req).formatWith(errorFormatter)

    if (!errors.isEmpty()) {
        req.flash('fail', 'Please provide valid data')

        res.render('pages/dashboard/post/create-post', {
            title: 'Create New Post',
            error: errors.mapped(),
            flashMessage: Flash.getMessage(req),
            value: {
                title,
                body,
                tags
            }
        })
    }

    if (tags) {
        tags = tags.split(',')
    }

    let readTime = readingTime(body).text

    let post = new Post({
        title,
        body,
        tags,
        author: req.user._id,
        thumbnail: '',
        readTime,
        likes: [],
        dislikes: [],
        comments: []
    })

    if (req.file) {
        post.thumbnail = `/uploads/${req.file.filename}`
    }

    try {

        let createdPost = await post.save()
        await Profile.findOneAndUpdate({
            user: req.user._id
        }, {
            $push: {
                post: createdPost._id
            }
        })

        req.flash('success', 'Post Created successfully')
        return res.redirect(`/posts/edit/${createdPost._id}`)

    } catch (e) {
        next(e)
    }

}

exports.editPostGetController = async (req, res, next) => {
    let postId = req.params.postId
    try {

        let post = await Post.findOne({
            author: req.user._id,
            _id: postId
        })

        if (!post) {
            let error = new Error('404 Post not found')
            error.status = 404
            throw error
        }

        return res.render('pages/dashboard/post/edit-post', {
            error: {},
            title: 'Edit Your Post',
            post,
            flashMessage: Flash.getMessage(req)
        })

    } catch (e) {
        next(e)
    }
}

exports.editPostPostController = async (req, res, next) => {
    let errors = validationResult(req).formatWith(errorFormatter)

    let postId = req.params.postId

    let {
        title,
        body,
        tags
    } = req.body

    try {
        let post = await Post.findOne({
            author: req.user._id,
            _id: postId
        })

        if (!post) {
            let error = new Error('404 Post not found')
            error.status = 404
            throw error
        }

        if (!errors.isEmpty()) {

            req.flash('fail', 'Please Provide Valid Data!')

            res.render('pages/dashboard/post/edit-post', {
                title: 'Edit Your Post',
                error: errors.mapped(),
                flashMessage: Flash.getMessage(req),
                post
            })
        }

        if (tags) {
            tags = tags.split(',')
        }
        readTime = readingTime(body).text

        let thumbnail = post.thumbnail
        if (req.file) {
            thumbnail = `/uploads/${req.file.filename}`
        }


        await Post.findOneAndUpdate({
            _id: post._id
        }, {
            $set: {
                title,
                body,
                tags,
                thumbnail,
                readTime
            }
        }, {
            new: true
        })

        req.flash('success', 'Post Update Successfully!')
        res.redirect(`/posts`)

    } catch (e) {
        next(e)
    }
}

exports.deletePostGetController = async (req,res,next) => {
    let {postId} = req.params

    try {
        let post = await Post.findOne({author: req.user._id, _id: postId})
        if(!post){
            let error = new Error('404 Page not Found')
            error.status = 404
            throw error
        }

        await Post.findOneAndDelete({_id: postId})
        await Profile.findOneAndUpdate({user: req.user._id},{
            $pull: {'post': postId}
        })

        req.flash('success', 'Post Delete Successfully')
        res.redirect('/posts')
    } catch (e) {
        next(e)
    }

}

exports.postGetController = async (req,res,next) => {
    try {
        let posts = await Post.find({author:req.user._id})

        res.render('pages/dashboard/post/posts', {
            title: 'My Created Posts',
            posts,
            flashMessage: Flash.getMessage(req)
        })
    } catch (e) {
        next(e)
    }
}