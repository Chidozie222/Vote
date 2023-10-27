const { Router } = require("express");
const mongoose = require("mongoose")

const signin = Router()

require('../index')

require('../models/userauth')

const user = mongoose.model('user')


signin.post('/login', async(req, res) => {
    const {email, password} = req.body;

    try {
        const User = await user.findOne({email})

        if (!email) {
            res.send({status: 'ok', message: 'Sorry your details do not exist, please sign up'})
        } else {
            if (User.password == password) {
                res.send({status: 'ok', data: User})
            } else {
                res.send({status: 'error', data: 'please check your email or password'})
            }
        }
    } catch (error) {
        res.send({status: 'ok', message: 'Sorry, error in the server, please reload the page'})
    }
})


module.exports = signin