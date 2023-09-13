const express = require('express');
const mongoose = require('mongoose');
const Vote = require('../models/vote');
const router = express.Router();

const Pusher = require('pusher');

const pusher = new Pusher({
    appId: process.env.APPID,
    key: process.env.KEY,
    secret: process.env.SECRET,
    cluster: "ap2",
    useTLS: true
});

router.get('/', (req, res) => {
    Vote.find().then(votes=> res.join({success:true, votes:votes}));
});


router.post('/', (req, res) => {
    const newVote = {
        os: req.body.os,
        points: 1
    };

    new Vote(newVote).save().then(vote => {
        pusher.trigger("os-poll", "os-vote", {
            points: parseInt(vote.points),
            os: req.body.os
        });

        return res.json({ success: true, message: 'Thank you for voting' });
    });

});

module.exports = router;