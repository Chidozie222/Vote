const { Router } = require("express");
const mongoose = require("mongoose");
const multer = require('multer');

require('../index');
require('../models/candidate');

const candidateInfo = Router();
let candidate = mongoose.model('candidate');

const storage = multer.diskStorage({
    destination: 'uploads/', // Store uploaded files in the 'uploads' directory
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });



candidateInfo.post('/cadidateInformation', upload.single('media'), async(req, res) => {
    const {candidateName, position, affilation, Title, Useremail} = req.body
    const {image} = req.file
    try {
        await candidate.create({
            candidateName,
            position,
            affilation,
            Title,
            Useremail,
            image
        })

        res.send({status: 'ok', message: 'data inputed successfully'})
    } catch (error) {
        res.send({status: 'error', message: 'error send the data to the server. please try again later'})
    }
})

candidateInfo.post('/getcandidateinfo', async(req, res) => {
    const {Useremail, Title, position, _id} = req.body
    try {
        let email = await candidate.find({Useremail})
        if (email) {
            let title = await candidate.find({Title})
            if (title) {
                res.send({status: 'ok', data: title})
                let pos = await candidate.find({position})
                if (pos) {
                    res.send({status: 'ok', Data: pos})
                    let id = await candidate.findOne({_id})
                    if (id) {
                        res.send({status: 'ok', Data1: id}) 
                    }
                }
            }
        }
    } catch (error) {
        res.send({status: 'error', message: 'error in the server'})
    }
})



module.exports = candidateInfo