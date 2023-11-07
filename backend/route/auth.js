const { Router } = require("express");
const auth = Router()
const passport = require('passport');
const session = require('express-session');
const User = require('../models/auth')
require('dotenv').config()
require('../Auth/google')
auth.use(session({
    secret: process.env.sercet, 
    resave: false,
    saveUninitialized: true,
  }));
auth.use(passport.initialize())
auth.use(passport.session())
auth.get('/google', passport.authenticate('google', {scope: ['profile', 'email']}))
 

auth.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/failed'})
, async(req, res) => {
    const Username = req.user.displayName
    const Useremail = req.user.emails[0].value
    const googleId = req.user.id
    const Photo = req.user.photos[0].value
    try {
            await User.findOrCreate({
                Username,
                Useremail,
                googleId,
                Photo
        })
        res.send({status: 'ok', message: 'data uploaded successfully', data: Useremail})
    } catch (error) {
        res.send({status: 'error', message: 'error in the server'})
        console.log(error);
    }    
})

auth.get('/facebook', passport.authenticate('fac'))
module.exports = auth;