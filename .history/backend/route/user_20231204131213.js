const { Router } = require("express");
const mongoose = require("mongoose");
const multer = require('multer');
const express = require('express')
const path = require('path');

const userinfo = Router();

require('../index');
require('../models/userauth');

const user = mongoose.model('user');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    }, 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });


userinfo.use(express.static('public'))

userinfo.post('/user', async (req, res) => {
    const { Useremail } = req.body; // Extract the email string from the request body
    try {
        let User = await user.findOne({ Useremail })
            if (User) {
                res.send({status: 'ok', data: User})
            } else {
                res.send({status: 'error'})
            }
    } catch (error) {
        res.send({ status: 'error', message: "Error with the server" });
    }
});


userinfo.post('/image-for_User_setting', upload.single('image'), async(req, res) => {
    const { Useremail } = req.body;
    if (!req.file) {
        return res.status(400).send({ status: 'error', message: 'No image file uploaded' });
    }
    
    const imagePath = req.file.filename;
    try {
        await user.updateOne(
            {
                Useremail
            },
            {$set: {
                photo: imagePath,
            }}
        )
        res.send({status: 'ok', message: 'image Uploaded successfully'})
    } catch (error) {
        res.send({status: 'error', message: 'error in the server'})
    }
})

module.exports = userinfo;
