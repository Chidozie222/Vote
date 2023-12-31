const { Router } = require("express");
const mongoose = require("mongoose")

const signup = Router()

require('../index')

require('../models/userauth')

const user = mongoose.model('user')


signup.post('/register', async(req, res) => {
    const {Username, Useremail, PhoneNumber, password} = req.body;
try {
    const oldUser = await user.findOne({Useremail})

    if (oldUser) {
        res.send({status: 'error', message: "please this email already exist"})
    } else {
        await user.create({
            Username,
            Useremail,
            PhoneNumber,
            password
        })
        let Newuser = await user.findOne({Useremail})
        res.send({status: 'ok', data: Newuser.Useremail, message: 'data upload successful'})
    }
} catch (error) {
    res.send({status: "error", message: "error with the server"})
}
})


module.exports = signup