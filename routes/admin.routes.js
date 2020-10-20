const express = require("express");
const mongoose = require("mongoose");
const checkAuth = require('../middleware/checkAuth');

require("dotenv").config();
const Team = require("../models/team");
const Amenities = require("../models/amenities");
const Campaign = require("../models/campaign");

const router = express.Router();

router.get('/getNotAmenities', checkAuth, async (req, res) => {
    if (req.team.userType !== "A") {
        console.log("Not an admin");
        return res.status(201).json({ message: "Authentication Failed.. not admin" })
    }
    await Team.find({ amenSub: false }).exec().then((team) => {
        if (team.length > 0) {
            console.log(team);
            return res.status(200).json({
                message: "Teams Found!",
                result: team
            });
        } else {
            console.log('All amenities Submitted');
            return res.status(201).json({ message: "All teams have submitted succesfully" });
        }
    }).catch((err) => {
        console.log(err)
        return res.status(201).json({ message: "Unexpected Error" });
    })
});

router.get('/getNotCampaign', checkAuth, async (req, res) => {
    if (req.team.userType !== "A") {
        console.log("Not an admin");
        return res.status(201).json({ message: "Authentication Failed.. not admin" })
    }
    await Team.find({ camSub: false }).exec().then((team) => {
        if (team.length > 0) {
            console.log(team);
            return res.status(200).json({
                message: "Teams Found!",
                result: team
            });
        } else {
            console.log('All campaigns Submitted');
            return res.status(201).json({ message: "All teams have submitted succesfully" });
        }
    }).catch((err) => {
        console.log(err)
        return res.status(201).json({ message: "Unexpected Error" });
    })
});

router.get('/getTeam', checkAuth, async (req, res) => {
    if (req.team.userType !== "A") {
        console.log("Not an admin");
        return res.status(201).json({ message: "Authentication Failed.. not admin" })
    }
    await Team.find({ code: req.body.code }).exec().then((team) => {
        if (team.length > 0) {
            let T = team[0], A = null, C = null;
            if (team[0].amenSub === true) {
                Amenities.find({ teamCode: T.code })
                    .exec()
                    .then((amenity) => {
                        if (amenity.length < 1) {
                            A = amenity[0];
                        }
                    }).catch((err) => {
                        console.log(err)
                        return res.status(201).json({ message: "Unexpected Error" });
                    })
            }
            if (team[0].camSub === true) {
                Campaign.find({ teamCode: T.code })
                    .exec()
                    .then((campaign) => {
                        if (campaign.length < 1) {
                            C = campaign[0];
                        }
                    }).catch((err) => {
                        console.log(err)
                        return res.status(201).json({ message: "Unexpected Error" });
                    })
            }
            return res.status(200).json({
                team: T,
                Amenities: A,
                Campaign: C
            });
        } else {
            console.log('Team Not Found:', req.body.code);
            return res.status(201).json({ message: "Team Not Found" });
        }
    }).catch((err) => {
        console.log(err)
        return res.status(201).json({ message: "Unexpected Error" });
    })
});

//At end
module.exports = router;