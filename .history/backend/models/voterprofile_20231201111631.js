const mongoose = require('mongoose')


const voterprofile = new mongoose.Schema(
    {
        Name: {type: String, require: true},
        code: {type: String, require: true},
        email: { type: String, require: true },
        Title: {type: String, require: true},
        Useremail: {type: String, require: true}
    },
    {
        collection: 'csv'
    }
)


mongoose.model("csv", voterprofile)