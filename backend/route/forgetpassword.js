const { Router } = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { sendOTP, verifyOTP, hashOTP } = require('../controller/otpfunction');
const {storeHashedOTP, retrieveHashedOTPFromDatabase, deleteHashedOTP} = require('../controller/otpfile')

const fp = Router()

require('../index');
require('../models/voterprofile');

let Otp = mongoose.model('csv');



fp.post('/fogetpassword', async (req, res) => {
    const { email } = req.body;
    try {
        const otp = await sendOTP(email);
        const OTP = await hashOTP(otp);
        await storeHashedOTP(email, OTP);
        res.status(200).json({ message: 'OTP sent and hashed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending and hashing OTP', error });
        throw error
    }
});

fp.post('/verifypassword', async (req, res) => {
    const {Useremail, Newpassword} = req.body
    let email = Useremail
    try {
        const OTP = await retrieveHashedOTPFromDatabase(email);
        const isValid = await verifyOTP(OTP);
        const code = PhoneNumber;
        console.log(code);
        if (isValid == otp) {
            const Email = await Otp.findOne({Useremail: email})
            if (Email) {
                await Otp.updateOne(
                    {Useremail: email},
                    {$set: {password: Newpassword}}
                )
                res.send({status: 'ok', message: 'Password Updated'})
            } else {
                res.send({status: 'error', message: 'email does not exist'})
            }
            
        } else {
            res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP', error });
        console.log(error);
    }
});



module.exports = fp