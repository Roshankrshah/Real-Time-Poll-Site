const express = require('express');
const router = express.Router();

const Pusher = require('pusher');

const pusher = new Pusher({
    appId: "1669665",
    key: "4e5c9b8f211ca6c1af8d",
    secret: "05303dc92f77d2591b49",
    cluster: "ap2",
    useTLS: true
});

router.get('/', (req, res) => {
    res.send('POLL');
});


router.post('/', (req, res) => {
    pusher.trigger("os-poll", "os-vote", {
        points: 1,
        os: req.body.os
    });

    return res.json({success: true, message: 'Thank you for voting'});
});

module.exports = router;