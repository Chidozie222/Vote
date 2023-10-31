const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');

require('dotenv').config()
console.log(process.env.email);
console.log(process.env.password);

// Function to generate OTP
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000);
}

// Function to hash the OTP
// Function to hash the OTP
async function hashOTP(otp) {
    const salt = await bcrypt.genSalt();
    return await bcrypt.hash(otp.toString(), salt);
}

// Function to verify the OTP
async function verifyOTP(hashedOTP, otp) {
    return await bcrypt.compare(otp, hashedOTP);
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
    const hashedOTP = await hashOTP(otp);

    const mailOptions = {
        from: process.env.email,
        to: email,
        subject: 'Your OTP for registration',
        text: `Your OTP is: ${otp}`
    };

    await transporter.sendMail(mailOptions);
    return hashedOTP;
}

module.exports = { sendOTP, verifyOTP };