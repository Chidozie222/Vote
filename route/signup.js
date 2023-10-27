const { Router } = require("express");
const mongoose = require("mongoose")

const signup = Router()

require('../index')

require('../models/userauth')

const user = mongoose.model('user')


signup.post('/register', async(req, res) => {
    const {Username, email, password} = req.body;
try {
    const oldUser = await user.findOne({email: email})

    if (oldUser) {
        res.send({status: 'error', message: "please this email already exist"})
    } else {
        await user.create({
            Username,
            email,
            password
        })
        res.send({status: 'ok'})
    }
} catch (error) {
    res.send({status: "error", message: "error with the server"})
}
})


module.exports = signup