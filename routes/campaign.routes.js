const express = require("express");
const mongoose = require("mongoose");
const checkAuth = require('../middleware/checkAuth');

const Team = require("../models/team");
const Campaign = require("../models/campaign");

const router = express.Router();

router.post('/add', checkAuth, async (req, res) => {
    (await Team.findOne({code: req.team.code})).execPopulate().then((team) => {
        if(team.camSub === true) {
            console.log(team);
            console.log("Already Submitted!");
            return res.status(400).json({message: "Campaign already Submitted"})
        }
    }) 
    const { description, imageUrl } = req.body;
    const camp = new Campaign({
        _id: new mongoose.Types.ObjectId(),
        description, 
        imageUrl,
        teamCode: req.team.code
    })
    await camp.save().then(async (result) => {
        await Team.updateOne({ code: req.team.code }, { $set: { camSub: true } });
        console.log(result);
        return res.status(201).json({ result });
    })
        .catch((err) => {
            console.log(err);
            return res.status(500).json({ message: "Failed" });
        });
});

router.get('/get', checkAuth, async (req, res) => {
    Campaign.find({ teamCode: req.team.code })
        .exec()
        .then((camp) => {
            console.log(camp)
            if (camp.length < 1) {
                return res.status(401).json({
                    message: "Not yet Submitted",
                });
            }
            return res.status(200).json({
                message: "Auth successful",
                campaign: camp
            });
        })
        .catch((err) => {
            res.status(500).json({
                message: "Team not found",
                error: err,
            });
        });
});

//At end
module.exports = router;