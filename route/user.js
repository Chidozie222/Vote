const { Router } = require("express");
const mongoose = require("mongoose");

const userinfo = Router();

require('../index');
require('../models/userauth');

const user = mongoose.model('user');

userinfo.post('/user', async (req, res) => {
    const { email } = req.body; // Extract the email string from the request body
    try {
        let User = await user.findOne({ email })
            .then((data) => {
                if (data) {
                    res.send({ status: 'ok', data: data }); // Send the retrieved data
                } else {
                    res.send({ status: 'error', message: "User not found" });
                }
            })
            .catch((err) => {
                res.send({ status: 'error', data: err });
            });
    } catch (error) {
        res.send({ status: 'error', message: "Error with the server" });
    }
});

module.exports = userinfo;
