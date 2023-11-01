const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

require('dotenv').config()

// Function to generate OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Function to hash the OTP
async function hashOTP(otp) {
    return await otp.toString()
}

// Function to verify the OTP
async function verifyOTP(OTP) {
    return OTP
} 

// Function to send OTP via email
async function sendOTP(email) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.email,
            pass: process.env.password
        },
        tls: {
            rejectUnauthorized: false // Bypass SSL verification (not recommended for production)
        }
    });
    

    const otp = generateOTP();

    const mailOptions = {
        from: process.env.email,
        to: email,
        subject: 'Your OTP for registration',
        text: `Your OTP is: ${otp}`
    };

    await transporter.sendMail(mailOptions);
    return otp;
}

module.exports = { sendOTP, verifyOTP, hashOTP };