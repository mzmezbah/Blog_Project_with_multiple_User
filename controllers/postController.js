const Flash = require('../utils/Flash')
exports.createPostGetController = (req,res,next) => {
    return res.render('pages/dashboard/post/create-post', {
        title: 'Create New Post',
        error: {},
        flashMessage: Flash.getMessage(req)
    })

}

exports.createPostPostController = (req,res,next) => {
   next()
}