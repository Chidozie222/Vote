const passport = require('passport')

const GoogleStrategy = require('passport-google-oauth20').Strategy

require('dotenv').config() 
passport.serializeUser((user, done) => {
    done(null, user.id); // Store user ID in the session
  });
  
  passport.deserializeUser((id, done) => {
    // Retrieve user information using the stored user ID
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID:process.env.Google_client_id,
    clientSecret:process.env.Google_client_secret,
    callbackURL:"/auth/google/callback",
    passReqToCallback:true
}, function(request, accessToken, refreshToken, profile, done){
  return done(null, profile)
}
))