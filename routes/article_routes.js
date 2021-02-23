const express = require('express')
const router = express.Router()
const app = express()
const { check, validationResult } = require('express-validator')
//const { session } = require('passport')
let update_response =[]

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

router.get('/update', (req,res) => {
    if(req.cookies.jwt) {
        res.render('update_article')
    } else {
        res.status(200).redirect('/')
    }
})

router.post('/update', [
    check('title', 'Enter a valid title').isLength({min: 10}),
    check('body', 'Enter the minimum number of words').isLength({min: 100})
], (req,res) => {

    const error = validationResult(req)

    if(!error.isEmpty()) {
        res.render('update_article', {
            errors: error.mapped()
        })
    } else {
        update_response = req.body
        console.log("update_article: ", update_response)
        
        Article.findOneAndUpdate(
            { _id: update_response.authkey },
            {
              $set: {
                title: update_response.title,
                body: update_response.body,
              }
            },
            {
              upsert: false
            }
          )
          .then(result => {
            console.log(result)
            console.log('Article is successfully updated !!')
            res.redirect('/articlepage/article')
           })
          .catch(error => console.error(error))
    }
})

router.get('/delete', (req,res) => {

    const error = validationResult(req)

    if(!error.isEmpty()) {
        res.render('delete_article', {
            errors: error.mapped()
        })
    } else {
        delete_response = req.body
        console.log("deleted_article: ", req.body)
        
        Article.deleteOne(
            { _id: delete_response.authkey },

          )
          .then(result => {
            console.log(result)
            console.log('Article is successfully deleted !!')
            res.render('delete_article')
           })
          .catch(error => console.error(error))
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
// const { update_response } = require('../routes/article_routes')
// module.exports.variableName = "update_response";