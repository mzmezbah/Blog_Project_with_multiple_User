const router = require('express').Router()

const {searchItemGetController} = require('../controllers/searchController')

router.get('/', searchItemGetController)

module.exports = router