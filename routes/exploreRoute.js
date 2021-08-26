const router = require('express').Router()

const {exploreGetController} = require('../controllers/exploreController')


router.get('/', exploreGetController)

module.exports= router