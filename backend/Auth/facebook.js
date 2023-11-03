const passport = require('passport')

const FacebookStrategy = require('passport-facebook').Strategy

require('dotenv').config() 

passport.use(new FacebookStrategy({
    clientID:process.env.facebook_client_id,
    clientSecret:process.env.facebook_client_secret,
    callbackURL:process.env.facebook_callback,
    profileFields: ['id', 'displayName', 'emails']
}, function( token, refreshToken, profile, done){
    console.log(profile);
    return done(null, profile)
}
))