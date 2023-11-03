const { Router } = require("express");
const fb = Router()
const passport = require('passport');
const session = require('express-session');
const User = require('../models/auth')
require('dotenv').config()
require('../Auth/facebook')
fb.use(session({
    secret: process.env.sercet, 
    resave: false,
    saveUninitialized: true,
  }));
fb.use(passport.initialize())
fb.use(passport.session())


fb.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));

module.exports = fb;