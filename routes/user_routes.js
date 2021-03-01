const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
//const { session } = require('passport')
const jwt = require('jsonwebtoken')

let User = require('../models/user')

router.get('/login', (req,res) => {
    if(req.cookies.jwt){
        res.render('login')
    } else {
        res.redirect('/')
    }
})

router.get('/signin', (req,res) => {
    res.render('index')
})

router.get('/register', (req,res) => {
    if(req.cookies.jwt){
        res.redirect('/users/login')
    } else {
        res.render('register')
    }
})

router.post('/login', (req,res) => {
    //console.log('LOGIN ROUTE')
    let query = {email: req.body.email}
    User.findOne(query, (err,results) => {
        //console.log('RESULTS: ', results);
        //console.log(req.body)
        if(results.email === req.body.email && results.password === req.body.password) {
            /* req,session.email = results.email
            req.session.password = results.password */

            const token = jwt.sign({email: results.email}, (process.env.JWT_SECRET + Math.random()*300), { expiresIn: process.env.JWT_EXPIRES_IN })

            console.log(token);

            const cookieOption = {
                expires: new Date(
                    Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000,
                ),
                httpOnly: true
            }

            res.cookie('jwt', token, cookieOption)
            res.status(200).redirect('/users/login')

        } else {
            console.log('Wrong Email or Password !!')
            res.render('index', {
                message: 'Wrong email and password'
            })
        }
    })
})

router.post('/register', [
    check('name', 'Length of name must be atleast 3 latters').isLength({min: 3}),
    check('email', 'Please provide a valid email').isEmail(),
    check('password', 'Length of password must be atleast 5 latters').isLength({min: 5}),
], (req,res) => {

    //console.log(req.body);

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        res.render('register', {
            errors: errors.mapped() // For rendering error object to frontend
        })
    } else {

        //We have that particular email in our database
        let query = {email: req.body.email}
        User.findOne(query, (err,results) => {
            //console.log('RESULTS: ', result);
            try {
                if(err) {
                    console.log(err)
                } else if (results.email === req.body.email) {
                    console.log('Email already exists !')
                    res.render('register', {
                        message: 'Email already exists !'
                    })
                }
            } catch (error) {
                let user = new User(req.body)

                user.save((err) => {
                    if(err) {
                        console.log(err);
                    } else {
                        console.log('Registration is successful !!');
                        res.render('register', {
                            message: 'Registration is successful !!'
                        })
                        //res.redirect('/')
                    }
                })
            }
        })
    }
})

router.get('/logout', (req, res) => {
    console.log('USER IS LOGGED OUT !!');
    res.cookie('jwt', 'logout', {
        expires: new Date(Date.now() + 1),
        httpOnly: true
    })

    res.status(200).redirect('/users/signin')
})

module.exports = router;