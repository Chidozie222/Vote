const { Router } = require("express");
const { default: mongoose } = require("mongoose");

const results = Router()

require('../models/result')
require('../models/candidate')
require('../models/voterprofile')

let csvmodel = mongoose.model('csv');
let candidate = mongoose.model('candidate');
let result = mongoose.model('Result')

results.post('/results', async(req, res) => {
    const {Useremail, Title, _id} = req.body
    try {
        let email = await candidate.find({Useremail})
        if (email) {
            let title = await candidate.findOne({Title})
            if (title) {
                let id = await candidate.findById({_id})
                if (id) {
                    let Email = await csvmodel.find({Useremail})
                    if (Email) {
                        let Title1 = await csvmodel.findOne({Title})
                        if (Title1) {
                            const code = req.body
                            let Code = await csvmodel.findOne({code})
                            if (Code) {
                                await result.create({
                                    id,
                                    Code,
                                    Useremail,
                                    Title
                                })
                            }
                        }
                    }
                }
            }
        }
    } catch (error) {
        res.send({status: 'error', data: 'error in the server'})
    }
})


results.post('/getresults', async(req, res) => {
    const {Useremail, Title} = req.body
    try {
        let email = await result.find({Useremail})
        if(email){
            let title = await result.find({Title})
            if (title) {
                res.send({status: "ok", data: title})
            } else{
                res.send({status: error, data: "no data found"})
            }
        }
    } catch (error) {
        res.send({status: "error", data: "there is an error in the server"})
    }
})


module.exports = results