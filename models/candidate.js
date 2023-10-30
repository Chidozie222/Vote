const mongoose = require('mongoose')


const candidateinformation = new mongoose.Schema(
    {
        candidateName: {type: String, require: true},
        position: {type: String, require: true},
        affilation: String,
        image: {type: String, require: true},
        Title: {type: String, require: true},
        Useremail: {type: String, require: true}
    },
    {
        collection: "candidateInformation"
    }
)


mongoose.model('candidate', candidateinformation)