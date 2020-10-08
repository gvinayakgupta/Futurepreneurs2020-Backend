const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const saltRounds = 10;
// const bodyParser = require("body-parser");

require("dotenv").config();
const Team = require("../models/team");

const router = express.Router();

router.get('/reg', async (req, res) => {
    const { name, password, email } = req.body;
    const found = await Team.findOne({
        email
    });
    if(found) {
        return res.status(403).json({message: "Already Exist"});
    }
    bcrypt.hash(password, 10, async (err, hash) => {
        const team = new Team({
            _id: new mongoose.Types.ObjectId(),
            name,
            password: hash,
            email
        })
        await team.save().then((result) => {
            return res.status(201).json({ result });
        })
            .catch((err) => {
                return res.status(500).json({ message: "Failed" });
                // console.log(err)
            });
    })
});



//At end
module.exports = router;