const {
    body
} = require('express-validator')
const cheerio = require('cheerio')

module.exports = [
    body('title')
    .not().isEmpty().withMessage('Title Cannot Be Empty')
    .isLength({
        max: 100
    }).withMessage('Title Cannot Be More than 100 Chars')
    .trim(),
    body('body')
    .not().isEmpty().withMessage('Body Cannot be Empty')
    .custom(value => {
        let $ = cheerio.load(value)
        let text = $.text()
        if (text.length > 5000) {
            throw new Error('Body Cannot be More than 5000 Chars')
        }
        return true
    }).trim()
    ,
    body('tags')
        .not().isEmpty().withMessage('Tags Cannot be Empty')
]