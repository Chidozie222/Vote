const { Router } = require("express");
const mongoose = require("mongoose")

const Title = Router()

require('../index')

require('../models/title')

const title = mongoose.model('Title')


Title.post('/title', async(req, res) => {
    const {Useremail, Title} = req.body;
try {

        const find = await title.findOne({Useremail, Title})
        if (find) {
            res.send({status: 'error', message: 'Title already exists'})
        } else {
            await title.create({
                Title,
                Useremail
            })
            let time = await title.findOne({Title})
            res.send({status: 'ok', message: 'Election title has been uploaded', data: time})
        }
    } else {
        res.send({status: 'error', message: 'user Title not found'})
    }
} catch (error) {
    res.send({status: "error", message: "error with the server"})
}
})
Title.get('/title/:Useremail', async(req, res) => {
    let Useremail = req.params.Useremail
    const user = await title.find({Useremail})
    if (user) {
        res.send({status: 'ok', data: user})
    } else {
        res.send({status: 'error'})
    }
})


module.exports = Title