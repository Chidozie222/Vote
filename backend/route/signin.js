const { Router } = require("express");
const mongoose = require("mongoose")

const signin = Router()

require('../index')

require('../models/userauth')

const user = mongoose.model('user')


signin.post('/login', async(req, res) => {
    const {Useremail, password} = req.body;

    try {
        const User = await user.findOne({Useremail})

        if (!Useremail) {
            res.send({status: 'error', message: 'Sorry your details do not exist, please sign up'})
        } else {
            if (User.password == password) {
                res.send({status: 'ok', data: User.Useremail, message: 'log in successful'})
            } else {
                res.send({status: 'error', message: 'please check your email or password'})
            }
        }
    } catch (error) {
        res.send({status: 'error', message: 'Sorry, error in the server, please reload the page'})
    }
})


module.exports = signin