const { Router } = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { sendOTP, verifyOTP } = require('../controller/otpfunction');

const otp = Router()

require('../index');
require('../models/voterprofile');

let Otp = mongoose.model('csv');


otp.post('/sendotp', async (req, res) => {
    const { email } = req.body;
    try {
        const hashedOTP = await sendOTP(email);
        res.status(200).json({ message: 'OTP sent successfully', hashedOTP });
    } catch (error) {
        res.status(500).json({ message: 'Error sending OTP', error });
        console.log(error);
    }
});

otp.post('/verifyotp', async (req, res) => {
    const { email, otp, PhoneNumber, Name, Title, Useremail } = req.body;
    const hashedOTP = await sendOTP(email);
    try {
        const isValid = await verifyOTP(hashedOTP, otp);
        if (isValid) {
            await Otp.create({
                Name,
                email,
                code: PhoneNumber,
                Title,
                Useremail
            })
            res.status(200).json({ message: 'OTP verified successfully' });
        } else {
            res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP', error });
    }
});


module.exports = otp