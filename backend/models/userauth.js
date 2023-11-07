const mongoose = require('mongoose')


const userauth = new mongoose.Schema(
    {
        Username: {type: String, require: true},
        Useremail: {type: String, require: true},
        password: {type: String, require: true},
        Photo: String,
        PhoneNumber: String
    },
    {
        collection: 'UserInput'
    }
)


mongoose.model("user", userauth)