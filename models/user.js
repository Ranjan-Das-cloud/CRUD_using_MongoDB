const mongoose = require('mongoose')

let users = mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    }
})

let user = mongoose.model('users', users)

module.exports = user