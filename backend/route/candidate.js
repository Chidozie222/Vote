const { Router } = require("express");
const mongoose = require("mongoose");
const multer = require('multer');
const express = require('express')
const path = require('path');
require('../index');
require('../models/candidate');
require('../models/position')

const candidateInfo = Router();
let candidate = mongoose.model('candidate');
let posi = mongoose.model('Position')

const storage = multer.diskStorage({
    destination: 'public/uploads/', // Store uploaded files in the 'public/uploads' directory
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname);
    },
});

const upload = multer({ storage: storage });

candidateInfo.use('/public/uploads', express.static(path.join(__dirname, 'public')));
candidateInfo.post('/cadidateInformation', upload.single('image'), async(req, res) => {
    const {candidateName, position, Affiliate, Title, Useremail} = req.body

    if (!req.file) {
        return res.status(400).send({ status: 'error', message: 'No image file uploaded' });
    }
    
    const imagePath = req.file.filename;  // Corrected this line
    try {
        await candidate.create({
            candidateName,
            position,
            Affiliate,
            Title,
            Useremail,
            image: imagePath.trim(),
        })

        res.send({status: 'ok', message: 'data inputed successfully'})
    } catch (error) {
        res.send({status: 'error', message: 'error send the data to the server. please try again later'})
        console.log(error);
    }
})

candidateInfo.get('/getcandidateinfoTitle/:Useremail/:Title', async(req, res) => {
    const {Useremail, Title} = req.params
    try {
        let email = await candidate.find({Useremail})
        if (email) {
            let title = await candidate.find({Title})
                res.send({status: 'ok', data: title})
        }
    } catch (error) {
        res.send({status: 'error', message: 'error in the server'})
    }
})

candidateInfo.get('/getcandidateinfo/:Useremail/:Title/:position', async(req, res) => {
    const {Useremail, Title, position} = req.params
    try {
        let email = await candidate.find({Useremail})
        if (email) {
            let title = await candidate.find({Title})
            if (title) {
                let pos = await candidate.find({position})
                res.send({status: 'ok', data: pos})
            }
        }
    } catch (error) {
        res.send({status: 'error', message: 'error in the server'})
    }
})

candidateInfo.get('/position_title/:Useremail/:Title', async(req, res)=> {
    const {Useremail, Title} = req.params
    try {
        let email = await posi.find({Useremail})
        if (email) {
            let title = await posi.find({Title})
                res.send({status: 'ok', data: title})
        }
    } catch (error) {
        res.send({status: 'error', message: 'error in the server'})
    }
})

candidateInfo.post('/position_title', async(req, res)=> {
    const {Useremail, Title, position} = req.body
    try {
        let email = await posi.find({Useremail})
        if (email) {
            let title = await posi.find({Title})
            if (title) {
                let pos = await posi.find({position})
                console.log(pos);
                if (pos.Useremail) {
                    res.send({status: 'error', message: 'position already exists'})
                } else {
                    await posi.create({
                        Useremail,
                        Title,
                        position
                    })
                    res.send({status: 'ok', message: 'successful'})
                }
            }
        }
    } catch (error) {
        res.send({status: 'error', message: 'error in the server'})
    }
})




module.exports = candidateInfo