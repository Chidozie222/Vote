const mongoose = require('mongoose')


const userauth = new mongoose.Schema(
    {
        Username: {type: String, require: true},
        email: {type: String, require: true},
        password: {type: String, require: true}
    },
    {
        collection: 'UserInput'
    }
)


mongoose.model("user", userauth)