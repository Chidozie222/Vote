const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose')
const home = require('./home')
const app = express();
app.use(express.json())
app.use(cors())
app.use('*', home)
require('dotenv').config()
app.listen(2000, (err, res) => {
    console.log('this port is running on 2000');
})