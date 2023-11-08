const mongoose = require('mongoose')


const candidateinformation = new mongoose.Schema(
    {
        candidateName: {type: String, required: true},
        position: {type: String, required: true},
        Affiliate: String,
        image: {type: String, required: true},
        Title: {type: String, required: true},
        Useremail: {type: String, required: true}
    },
    {
        collection: "candidateInformation"
    }
)


mongoose.model('candidate', candidateinformation)