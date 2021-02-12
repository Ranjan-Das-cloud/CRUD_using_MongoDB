const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
//const { session } = require('passport')

//Article Model
const  Article = require('../models/article')

router.get('/article', (req,res) => {

    if(req.cookies.jwt){
        
        console.log('working');

        require('../models/user',).find({}, (err, results) => {
            console.log(results);
        })
        let query = {}
        Article.find({}, (err, results) => {
            if(err) {
                console.log(err);
            } else {
                console.log(results);
            }
        })
        res.render('article')
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

module.exports = router;