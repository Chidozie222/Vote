const mongoose = require('mongoose')

const Result = new mongoose.Schema(
    {
        candidateName: {type: String, require: true},
        position: {type: String, require: true},
        image: {type: String, require: true},
        Name: {type: String, require: true},
        email: {type: String, require: true},
        Title: {type: String, require: true},
        Useremail: {type: String, require: true}
    },
    {
        collection: 'results'
    }
)

mongoose.model("Result", Result)