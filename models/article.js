const mongoose = require('mongoose') // A library by which we can communicate with MongoDB

let articleSchema = mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    author: {
        type: String,
        require: true
    },
    body: {
        type: String,
        require: true
    },
    author_id: {
        type: String,
        require: true
    },
})

let Article = mongoose.model('article', articleSchema)

module.exports = Article