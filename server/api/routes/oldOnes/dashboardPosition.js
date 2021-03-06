const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const checkAuth = require('../../auth/auth-guard');
const DashboardPosition = require('../models/dashboardPosition');



router.post('/', checkAuth, (req, res, next) => {
    const dashboar = new DashboardPosition({
        dashboard: req.body.dashboard,
        userId: req.body.userId
    });
 
    
    DashboardPosition.find({
        userId: req.body.userId
    }).exec().then(dashboard => {
        if (dashboard.length >= 1) {
            DashboardPosition.updateOne({userId: req.body.userId}, {$set: req.body}).exec().then(result => {
                res.status(200).json({
                    message: "updated"
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({error: err});
            });
        } else {

            dashboar.save()
                .then(dashboardSaved => {

                    res.status(201).json("dashboard saved " + dashboardSaved);
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

router.get('/:userId', checkAuth, (req, res, next) => {        
    DashboardPosition.findOne({userId: req.params.userId})
        .select('userId dashboard')
        .exec()
        .then(doc => { 

            if (doc) {
                res.status(200).json({
                    doc
                });


            } else {
                DashboardPosition.findOne({userId: 0})
                .select('userId dashboard ')
                .exec()
                .then(docs => {
                    if(docs) {

                        res.status(200).json({
                            docs
                        })
                    }
                })
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
});

module.exports = router;