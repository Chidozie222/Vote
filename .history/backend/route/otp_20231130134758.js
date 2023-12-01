const { Router } = require("express");
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { sendOTP, verifyOTP, hashOTP } = require('../controller/otpfunction');
const {storeHashedOTP, retrieveHashedOTPFromDatabase, deleteHashedOTP} = require('../controller/otpfile');
const { listIndexes } = require("../models/otp");

const otp = Router()

require('../index');
require('../models/voterprofile');

let Otp = mongoose.model('csv');



otp.post('/sendotp', async (req, res) => {
    const { email } = req.body;
    try {
        const otp = await sendOTP(email);
        const OTP = await hashOTP(otp);
        await storeHashedOTP(email, OTP);
        res.status(200).json({status: 'ok', message: 'OTP sent and hashed successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error sending and hashing OTP', error });
        throw error
    }
});

otp.post('/verifyotp', async (req, res) => {
    const { email, otp, PhoneNumber, Name, Useremail } = req.body;
    
    try {
        const OTP = await retrieveHashedOTPFromDatabase(email);
        const isValid = await verifyOTP(OTP);
        const code = PhoneNumber;
        if (isValid === otp) {
            let user = await Otp.find({Useremail})
            if (user) {}
                for (let index = 0; index < user.length; index++) {
                    if (user[lndex].email == email) {
                        res.status(501).json({message: "this user already exist"})
                    } else {
                        await Otp.create({
                            Name,
                            code,
                            email,
                            Useremail
                        });
                        await deleteHashedOTP(email);
                        res.status(200).json({status: 'ok',  message: 'OTP verified successfully' });
                    
                }
                
                }
            }
           
        } else {
            res.status(400).json({ message: 'Invalid OTP' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error verifying OTP', error });
    }
});



module.exports = otp