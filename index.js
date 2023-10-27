const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const home = require('./route/home')
const signup = require('./route/signup')
const signin = require('./route/signin')
const userinfo = require("./route/user")
const voterprofile = require('./route/voterprofile')
const app = express();
app.use(express.json())
app.use(cors())
app.use(home)
app.use(signup)
app.use(signin)
app.use(userinfo)
app.use(voterprofile)
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
app.listen(2000, (err, res) => {
    console.log('this port is running on 2000');
})