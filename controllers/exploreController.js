const moment = require('moment')

const Flash = require('../utils/Flash')
const Post = require('../models/Post')
const Profile = require('../models/Profile')

function genDate(days) {
    let date = moment().subtract(days, 'days')
    return date.toDate()
}

function generateFilterObject(filter) {
    let filterObj = {}
    let order = 1
    switch (filter) {
        case 'week': {
            filterObj = {
                createdAt: {
                    $gt: genDate(7)
                }
            }
            order = -1
            break
        }
        case 'month': {
            filterObj = {
                createdAt: {
                    $gt: genDate(30)
                }
            }
            order = -1
            break
        }
        case 'all': {
            order = -1
            break
        }
    }
    return {
        filterObj,
        order
    }
}

exports.exploreGetController = async (req, res, next) => {
    let filter = req.query.filter || 'latest'
    let currentPage = parseInt(req.query.page) || 1
    let itemPerPage = 10

    let {
        filterObj,
        order
    } = generateFilterObject(filter.toLowerCase())

    try {

        let posts = await Post.find(filterObj)
                            .populate('author', 'username')
                            .sort(order == 1 ? '-createdAt' : 'createdAt')
                            .skip((itemPerPage * currentPage) - itemPerPage)
                            .limit(itemPerPage)

        let totalPost = await Post.countDocuments()
        let totalPage = Math.ceil(totalPost/itemPerPage)

        let bookmarks = []

        if(req.user){
            let profile = await Profile.findOne({user: req.user._id})
            if(profile){
                bookmarks = profile.bookmarks
            }
        }

        res.render('pages/explorer/explore.ejs', {
            title: 'Explore All Post',
            filter,
            flashMessage: Flash.getMessage(req),
            posts,
            currentPage,
            itemPerPage,
            totalPage,
            bookmarks
        })
    } catch (e) {
        next(e)
    }

}

exports.singlePageGetController = async (req,res,next) => {
    let {postId} = req.params

    try {
        let post = await Post.findById(postId)
                        .populate('author', 'username profilePic')
                        .populate({
                            path: 'comments',
                            populate: {
                                path: 'user',
                                select: 'username profilePic'
                            }
                        })
                        .populate({
                            path: 'comments',
                            populate: {
                                path: 'replies.user',
                                select: 'username profilePic'
                            }
                        })
        
        if(!post){
            let error = new Error('404 page not found')
            error.status = 404
            throw error
        }

        let bookmarks = []

        if(req.user){
            let profile = await Profile.findOne({user: req.user._id})
            if(profile){
                bookmarks = profile.bookmarks
            }
        }

        res.render('pages/explorer/singlePage',{
            title: post.title,
            flashMessage: Flash.getMessage(req),
            post,
            bookmarks
        })

    } catch (e) {
        next(e)
    }
}