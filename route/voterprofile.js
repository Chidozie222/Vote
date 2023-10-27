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
                            email: entry.email
                        });
                        await csvData.save();
                    }

                    res.status(200).json({ message: 'Data saved to MongoDB' });
                });
        } else {
            res.status(400).json({ error: 'No file uploaded' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = voterprofile;
