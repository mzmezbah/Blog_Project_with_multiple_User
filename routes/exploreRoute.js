const router = require('express').Router()

const {exploreGetController, singlePageGetController} = require('../controllers/exploreController')


router.get('/:postId', singlePageGetController)

router.get('/', exploreGetController)

module.exports= router