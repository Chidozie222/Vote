const mongoose = require('mongoose')


const Title = new mongoose.Schema(
    {
        Title: {type: String, require: true},
        Useremail: {type: String, require: true}
    },
    {
        collection: 'Title'
    }
)

mongoose.model("Title", Title)