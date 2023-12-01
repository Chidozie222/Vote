const { Router } = require("express");
const mongoose = require("mongoose");
const multer = require('multer');
const csvtojson = require('csvtojson');
const fs = require('fs');

require('../index');
require('../models/voterprofile');

const voterprofile = Router();
let csvmodel = mongoose.model('csv');

const storage = multer.diskStorage({
    destination: 'uploads/', // Store uploaded files in the 'uploads' directory
    filename: (req, file, callback) => {
        callback(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

voterprofile.post('/csvfile', upload.single('csvfile'), async (req, res) => {
    const {Title, Useremail} = req.body
    const csvfile = req.file;
    try {
        if (csvfile) {
            const csvFilePath = csvfile.path;

            // Use csvtojson to parse the CSV data
            csvtojson()
                .fromFile(csvFilePath)
                .then(async (jsonArrayObj) => {
                    for (const entry of jsonArrayObj) {
                        const csvData = new csvmodel({
                            Name: entry.Name,
                            code: entry.code,
                            email: entry.email,
                            Title: Title,
                            Useremail: Useremail
                        });
                        await csvData.save();
                    }

                    res.status(200).json({ status: 'ok', message: 'Data saved' });
                });
        } else {
            res.status(400).json({ error: 'No file uploaded' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

voterprofile.get('/csvusers/:Useremail', async(req, res) => {
    const{Useremail} = req.params
    try{
    let email = await csvmodel.find({Useremail})
    if(email){
            res.send({status: "ok", data: email})
    } else{
            res.send({status: 'error'})
    }
} catch(Error){
    res.status(400).send({status: "error", data: "error in the server"})
}
})

voterprofile.post('/voter_platform-login', async(req, res) => {
    const {email, code, Title, Useremail} = req.body
    try{
        let useremail = await csvmodel.find({Useremail, Title, email})
        if (useremail) {
            for (let index = 0; index < array.length; index++) {}
                
            }
        } else {
            res.send({status: 'error', message: 'user not vaild'})
        }
    } catch(Error){
        res.status(400).send({status: "error", data: "error in the server"})
    }
})

module.exports = voterprofile;
