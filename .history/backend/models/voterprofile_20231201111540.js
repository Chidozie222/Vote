const mongoose = require('mongoose')


const voterprofile = new mongoose.Schema(
    {
        Name: {type: String, require: true},
        code: {type: String, require: true},
        email: { type: String, require: true },
        Ti
        Useremail: {type: String, require: true}
    },
    {
        collection: 'csv'
    }
)


mongoose.model("csv", voterprofile)