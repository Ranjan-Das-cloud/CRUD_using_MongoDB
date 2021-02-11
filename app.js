const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const session = require('express-session')
const bodyParser = require('body-parser')
const exphbs = require('express-handlebars')

//Creating Connection to MongoDB
mongoose.connect('mongodb://localhost/crud', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log("MonngoDB is connected !!");
}).catch((err) => {
    console.log(err);
})

//Init App
const app = express()

//Initializing express-handlebars
app.engine('.html', exphbs({defaultlayout: 'home', extname: 'html'}));
app.set('view engine', 'html');

app.get('/', (req,res) => {
    res.render('home')
})

app.listen(8000, () => {
    console.log("Server is running at port 8000")
})