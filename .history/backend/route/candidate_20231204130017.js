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
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    }, 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });

candidateInfo.use(express.static('public'))
 
candidateInfo.post('/cadidateInformation', upload.single('image'), async(req, res) => {
    const {candidateName, position, Affiliate, Title, Useremail} = req.body

    if (!req.file) {
        return res.status(400).send({ status: 'error', message: 'No image file uploaded' });
    }
    let maxsize = 2 * 1024 * 1024
    const imagePath = req.file.filename;  // Corrected this line
    try {
        if (maxsize >= req.file.size) {
        let user = await candidate.find({Useremail, position})
         if (user.length > 0) {
    //         for (let i = 0; i < user.length; i++) {
    //             if(user[i].candidateName == candidateName){
    //                 res.send({status: 'error', message: 'candidate alrady exist'})
    //             } else{
    //             await candidate.create({
    //                 candidateName,
    //                 position,
    //                 Affiliate,
    //                 Title,
    //                 Useremail,
    //                 image: imagePath,
    //             })
    //             res.send({status: 'ok', message: 'data inputed successfully'})
    //             } 
    // }
    // else{
    //     await candidate.create({
    //         candidateName,
    //         position,
    //         Affiliate,
    //         Title,
    //         Useremail,
    //         image: imagePath,
    //     })
    //     res.send({status: 'ok', message: 'data inputed successfully'})
         }
} else{
    res.send({status: 'error', message: 'file is too large, max of 2MB is alowed'})
}
    } catch (error) {
        res.send({status: 'error', message: 'error send the data to the server. please try again later'})
    }
})

candidateInfo.get('/getcandidateinfoTitle/:Useremail/:Title', async(req, res) => {
    const {Useremail, Title} = req.params
    try {
        let email = await candidate.find({Useremail})
        if (email) {
            let title = await candidate.find({Useremail, Title})
                res.send({status: 'ok', data: title})
        }
    } catch (error) {
        res.send({status: 'error', message: 'error in the server'})
    }
})

candidateInfo.get('/getcandidateinfo/:Useremail/:Title/:position', async(req, res) => {
    const {Useremail, Title, position} = req.params
    try {
                let pos = await candidate.find({Useremail, Title, position})
                if (pos[0].candidateName) {
                    res.send({status: 'ok', data: pos})
                } else {
                    res.send({status: 'error', data: 'none'})
                }
    } catch (error) {
        res.send({status: 'error', message: 'error in the server'})
    }
})

candidateInfo.get('/position_title/:Useremail/:Title', async(req, res)=> {
    const { Useremail, Title } = req.params
    try {
        let email = await posi.find({Useremail})
        if (email) {
            let title = await posi.find({Title})
            res.send({ status: 'ok', data: title })
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