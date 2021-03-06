const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../../auth/auth-guard');

const Weather = require('../models/weather');



router.post('/', checkAuth,(req, res, next) => {
    const weather = new Weather({
        userId: req.body.userId,
        zip: req.body.zip,
        automaticLocation: req.body.automaticLocation
    });
    Weather.find({
        userId: req.body.userId
    }).exec().then(weather => {
        if (weather.length >= 1) {
            Weather.updateOne({userId: req.body.userId}, {$set: req.body}).exec().then(result => {
                res.status(200).json({
                    message: "updated"
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });
        } else {
            weather.save()
                .then(weatherCreated => {
                    res.status(201).json(weatherCreated);
                })
                .catch(err => {
                    console.log(err);
                    res.status(500).json({
                        error: err
                    });
                });
        }
    })

});

router.get('/', checkAuth,(req, res, next) => { 
    Weather.findOne(req.body.userId)
        .select('userId zip automaticLocation')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    doc
                });
            } else {
                res.status(404).json({message: 'No valid entry found for provided ID'});
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

module.exports = router;