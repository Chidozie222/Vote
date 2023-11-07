const { Router } = require("express");
const mongoose = require("mongoose");

const userinfo = Router();

require('../index');
require('../models/userauth');

const user = mongoose.model('user');

userinfo.post('/user', async (req, res) => {
    const { Useremail } = req.body; // Extract the email string from the request body
    try {
        let User = await user.findOne({ Useremail })
            if (User) {
                res.send({status: 'ok', data: User})
            } else {
                res.send({status: 'error'})
            }
    } catch (error) {
        res.send({ status: 'error', message: "Error with the server" });
    }
});

module.exports = userinfo;
