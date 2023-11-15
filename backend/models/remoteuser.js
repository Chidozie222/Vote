const mongoose = require('mongoose')


const remote_user = new mongoose.Schema(
    {
        Name: {type: String, require: true},
        code: {type: String, require: true},
        email: {type: String, require: true},
        Title: {type: String, require: true},
        Useremail: {type: String, require: true}
    },
    {
        collection: 'remote_User'
    }
)


mongoose.model("remote_user", remote_user)