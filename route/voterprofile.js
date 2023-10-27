const { Router } = require("express");
const  mongoose  = require("mongoose");
const multer = require('multer')
const csv = require('csv-parser')
const fs = require('fs')


require('../index')
require('../models/voterprofile')

const voterprofile = Router()
let csvmodel = mongoose.model('csv')




module.exports = voterprofile