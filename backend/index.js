const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const home = require('./route/home')
const signup = require('./route/signup')
const signin = require('./route/signin')
const userinfo = require("./route/user")
const voterprofile = require('./route/voterprofile')
const candidate = require('./route/candidate')
const result = require('./route/result')
const otp = require('./route/otp')
const auth = require('./route/auth')
const fb = require('./route/facebook')
const fogetpassword = require('./route/forgetpassword')
const Title = require('./route/title')
const app = express();
app.use(express.json())
app.use(cors())
app.use(home)
app.use(signup)
app.use(signin)
app.use(userinfo)
app.use(voterprofile)
app.use(candidate)
app.use(result)
app.use(otp)
app.use(auth)
app.use(fb)
app.use(fogetpassword)
app.use(Title)
require('dotenv').config()
let mongo = process.env.mongoUrl
mongoose.connect(mongo, {
    useNewUrlParser: true
})
.then(()=>{
    console.log('connected to the data');
})
.catch((Error) => {
    console.log(Error);
})
app.listen(process.env.port, (err, res) => {
    console.log(`this port is running on port: ${process.env.port}`);
})