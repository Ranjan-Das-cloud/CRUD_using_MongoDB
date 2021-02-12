const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
//const session = require('express-session')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const hbs = require('handlebars')
//const exphbs = require('express-handlebars')

//Creating Connection to MongoDB
mongoose.connect('mongodb://localhost:27017/blog', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("MongoDB is connected !!");
}).catch((err) => {
    console.log(err);
})

//Init App
const app = express()

// Public directory accesspoint
// CSS and JS or IMG files

const publicDirectory = path.join(__dirname, './public')

// Make sure that express is using the public directory
app.use(express.static(publicDirectory))

dotenv.config({
    path:'./.env'
})

// Values that we are getting from the form must come in json format
//app.use(express.json())

//Initializing cookie-parser
app.use(cookieParser())

//Initializing express-handlebars
//app.engine('.html', exphbs({defaultlayout: 'home', extname: 'html'}));

// Setting up the View Engine
app.set('view engine', 'hbs');

//Initializing Session
// app.use(session({
//     secret: 'mysecretsession',
//     resave: false,
//     saveUninitialized: false
// }))

//Body-Parser
app.use(bodyParser.urlencoded({ extended: true }))

// Values that we are getting from the form must come in json format
app.use(bodyParser.json())

//Home Route
app.get('/', (req,res) => {
    console.log('Cookies: ', req.cookies.jwt);
    if(req.cookies.jwt){
        res.redirect('/users/login')
    } else {
        res.render('index')
    }
    // res.render('index')
})

// Defining routes
app.use('/users', require('./routes/user_routes'));
app.use('/articlepage', require('./routes/article_routes'));

app.listen(8000, () => {
    console.log("Server is running at port 8000")
})