const mongoose = require('mongoose')
// controller/otpfile.js
const OTPModel = require('../models/otp');

async function storeHashedOTP(email, OTP) {
    try {
        await OTPModel.create({ email, OTP });
    } catch (error) {
        throw error;
    }
}

async function retrieveHashedOTPFromDatabase(email) {
    try {
        const otpRecord = await OTPModel.findOne({ email });
        return otpRecord ? otpRecord.OTP : null;
    } catch (error) {
        throw error;
    }
}


async function deleteHashedOTP(email) {
    try {
        await OTPModel.findOneAndDelete({ email });
    } catch (error) {
        throw error;
    }
}

module.exports = { storeHashedOTP, retrieveHashedOTPFromDatabase, deleteHashedOTP };
