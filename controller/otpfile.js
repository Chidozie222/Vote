const mongoose = require('mongoose')

let Otp = mongoose.model('csv');

async function retrieveHashedOTPFromDatabase(email) {
    try {
        const user = await Otp.findOne({ email });

        if (user && user.hashedOTP) {
            // A user with the provided email was found, and they have a hashedOTP value.
            return user.hashedOTP;
        } else {
            // Handle the case where the user or hashedOTP is not found.
            return null;
        }
    } catch (error) {
        throw error; // Handle any database query errors.
    }
}


// Export the function for use in your OTP verification route
module.exports = retrieveHashedOTPFromDatabase;
