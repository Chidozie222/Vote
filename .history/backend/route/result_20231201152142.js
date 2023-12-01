const { Router } = require("express");
const { default: mongoose } = require("mongoose");

const results = Router()

require('../models/result')
require('../models/candidate')
require('../models/voterprofile')
require('../models/remoteuser')

let csvmodel = mongoose.model('csv');
let candidate = mongoose.model('candidate');
let result = mongoose.model('Result')
let remove = mongoose.model('remote_user')

results.get('/user_info/:_id', async(req, res) => {
    const { _id } = req.params
    console.log(_id);
    try{
        let id = await csvmodel.findById({_id})
        if (id) {
            res.send({status: 'ok', data: id})
        } else {
            res.status(400).send({status: 'error'})
        }
    } catch(err) {
        res.status(500).send({status: 'error'})
    }
})

results.get('/candidate_id/:_id', async (req, res) => {
    const { _id } = req.params
    console.log(_id)
    try{
        let id = await candidate.findById({_id})
        if (id) {
            res.send({status: 'ok', data: id})
        } else {
            res.status(400).send({status: 'error'})
        }
    } catch(err) {
        res.status(500).send({status: 'error'})
    }
})

results.post('/voter_for_candidate', async(req, res) => {
    const {Name, email, Title, candidateName, position, image, Useremail} = req.body
    try {
        let useremail = await result.find({Useremail})
        if (useremail) {
            let title = await result.find({Title})
            if (title) {
                let pos = await result.find({position})
                if (pos) {
                    let canName = await result.find({candidateName})
                    for (let index = 0; index < canName.length; index++) {
                            if (canName[index] && canName[index].data && canName[index].data[index] && canName[index].data[index].Name == Name) {
                                res.send({status: 'error', message: 'You have already voted for a candidate, please vote for another position or click on sumbit'})
                            } else {
                                await result.updateOne(
                                    {candidateName: candidateName},
                                    {$push: {
                                        data: [{
                                            Name,
                                            email
                                        }]
                                    }}
                                )
                                res.send({status: 'ok', message: 'successfully voted for the candidate, move to the next position'})
                        }
                    }
                }
            }
        }
    } catch (error) {
        res.send({status: 'error', message: 'error in the server'})
    }
})

results.get('/results/:Useremail/:Title/:position/:candidateName', async(req, res) => {
    const {Useremail, Title, position, candidateName} = req.params
    try {
        let user = await result.find({Useremail})
                    if (candidate) {
                        res.send({status: 'ok', data: candidate})
                    } else{
                        res.send({status: 'error'})
                    }
                }
            }
        }
    } catch (error) {
        res.send({status: 'error'})
    }
})


results.post('/remove', async(req, res) => {
    const { email, code, Name, Title, Useremail } = req.body
    try {
        await remove.create({
            email,
            code,
            Name,
            Title,
            Useremail
        })
        res.send({status: 'ok'})
    } catch (error) {
        res.send({status: 'error'})
    }
})
results.get('/remove/:Useremail/:Title/:email', async(req, res) => {
    const {Useremail, Title, email} = req.params
    try {
        let user = await remove.find({Useremail})
        if (user) {
            let title = await remove.find({Title})
            if (title.length>0) {
                if(title[0].email == email ){
                    res.send({status: 'ok', message: 'sorry you have already voted for this title'})
                }
            } else {
                res.send({status: 'pending', message: `welcome`})
            }
        }
    } catch (error) {
        res.send({status: 'error', message: 'error in the server'})

    }
})


module.exports = results