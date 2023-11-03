const mongoose = require('mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new mongoose.Schema(
    {
    Username: String,
    Useremail: String,
    googleId: String,
    facebookId: String
},
{
    collection: 'UserInput'
}
);

userSchema.plugin(findOrCreate);

module.exports = mongoose.model('User', userSchema);
