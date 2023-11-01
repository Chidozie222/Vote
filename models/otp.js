// models/otp.js
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    OTP: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 120, // Set the TTL to 2 minutes (120 seconds)
    },
});

const OTPModel = mongoose.model('OTP', otpSchema);

module.exports = OTPModel;
