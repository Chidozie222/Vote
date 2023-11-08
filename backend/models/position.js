const mongoose = require('mongoose')


const position = new mongoose.Schema(
    {
        position: {type: String, require: true},
        Title: {type: String, require: true},
        Useremail: {type: String, require: true}
    },
    {
        collection: 'position'
    }
)

mongoose.model("Position", position)