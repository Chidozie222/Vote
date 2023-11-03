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
    try {
        await User.findOrCreate({
            Username,
            Useremail,
            googleId
    })
    res.send({status: 'ok', message: 'data uploaded successfully'})
    } catch (error) {
        res.send({status: 'ok', message: 'error in the server'})
    }    
})

auth.get('/facebook', passport.authenticate('fac'))
module.exports = auth;