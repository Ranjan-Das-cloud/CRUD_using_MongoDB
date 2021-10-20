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
mongoose.connect(process.env.DB_CLOUD_URI).then(() => {
    console.log("MongoDB is connected with host !!");
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

/* Views Middleware */
app.set('views', path.join(__dirname, "./views"));

//Initializing express-handlebars
// app.engine('.html', exphbs({defaultlayout: 'home', extname: 'html'}));
// app.engine('handlebars', exphbs.create({
//     handlebars: allowInSecurePrototypeAccess(hbs),
//     defaultlayout: 'main',
//     layoutDir: app.get('views') + '/layouts',
//     partialDir: [app.get('views') + '/partials']
// }).engine);

// Setting up the View Engine
app.set('view engine', 'hbs');

//Initializing Session
// app.use(session({
//     secret: 'mysecretsession',
//     resave: false,
//     saveUninitialized: false
// }))

//Body-Parser
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))

// Values that we are getting from the form must come in json format
// app.use(bodyParser.json())
app.use(express.json())

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

// Make Mongoose use `findOneAndUpdate()`. Note that this option is `true`
// by default, you need to set it to false.
// mongoose.set('useFindAndModify', false);



// Defining routes
app.use('/users', require('./routes/user_routes'));
app.use('/articlepage', require('./routes/article_routes'));

app.listen(process.env.PORT, () => {
    console.log(`Server is running at port ${process.env.PORT} in production`)
})