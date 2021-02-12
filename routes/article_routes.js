const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
//const { session } = require('passport')

//Article Model
const  Article = require('../models/article')

router.get('/article', (req,res) => {

    if(req.cookies.jwt){
        
        console.log('All articles have been delivered !!');

        // require('../models/user',).find({}, (err, results) => {
        //     console.log(results);
        // })
        let query = {}
        Article.find({}, (err, results) => {
            if(err) {
                console.log(err);
            } else {
                //console.log(results);

                res.render('article', {
                    articleData: results
                })
            }
        })

    } else {
        res.redirect('/')
    }
})

router.get('/add', (req,res) => {
    if(req.cookies.jwt) {
        res.render('add_article')
        console.log()
    } else {
        res.status(200).redirect('/')
    }
})

router.post('/add', [
    check('author', 'Enter a valid Name').isLength({min: 3}),
    check('title', 'Enter a valid title').isLength({min: 10}),
    check('body', 'Enter the minimum number of words').isLength({min: 100})
], (req,res) => {

    const error = validationResult(req)

    if(!error.isEmpty()) {
        res.render('add_article', {
            errors: error.mapped()
        })
    } else {
        let article = new Article(req.body)

        article.save((err) => {
            if(err) {
                console.log(err);
            } else {
                res.redirect('/articlepage/article')
            }
        })
    }
})

module.exports = router;