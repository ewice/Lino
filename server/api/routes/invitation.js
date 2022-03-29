const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Invitation = require('../models/invitation');
const User = require('../models/user');

router.get('/:invitationId', (req, res, err) => {
    const id = req.params.invitationId;
    Invitation.findById(id, (err, cat) => {
        if (err) return res.status(500).json({
            error: err
        })

        res.status(200).json(cat);
    })
})

router.get('/friendrequest', (req, res, err) => {
    Invitation.find({
            _id: body._id,
            isFriendRequest: true
        })
        .exec()
        .then(inv => {
            if (inv.length >= 0) {
                return res.status(200).json(inv)
            } else {
                res.status(404).json({
                    message: 'Keine Projekte gefunden'
                });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

router.get('/projectrequest', (req, res, err) => {
    Invitation.find({
            _id: body._id,
            isFriendRequest: false
        })
        .exec()
        .then(inv => {
            if (inv.length >= 0) {
                return res.status(200).json(inv)
            } else {
                res.status(404).json({
                    message: 'Keine Projekte gefunden'
                });
            }
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
})

router.post('/', (req, res, next) => {
    let body = req.body;
    const invitation = new Invitation({
        _id: new mongoose.Types.ObjectId(),
        creationDate: Date.now(),
        sender: body.sender,
        reciever: body.reciever,
        projektId: body.projektId,
        isFriendRequest: body.isFriendRequest,
        isAccepted: body.isAccepted
    });
    invitation.save().then(result => {
        
        User.find({_id: body.reciever})
    .exec()
    .then(us => {
     
        
        us[0].invitations.push(invitation._id);

        
        User.updateOne({_id: body.reciever}, {$set: us[0]})
        .exec()
        .then(u => {

            

            
        }).catch(err => {
            console.log(err);
            
        })

    }).catch(error => {

        
    })
        res.status(201).json(result);
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
    
});

router.post('/bulk', (req, res, err) => {
    let arr = req.body;
    
    Invitation.find({_id: {
        $in: arr.map((o)=> {
            return mongoose.Types.ObjectId(o);
        })
    }})
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    });
})

router.put('/:invitationId', (req, res, next) => {
    const id = req.params.invitationId;
    Invitation.updateOne({
            _id: id
        }, {
            $set: req.body
        })
        .exec()
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })

        })
    if (req.body.isFriendRequest && req.body.isAccepted) {
        User.find({
                _id: req.body.reciever
            })
            .exec()
            .then(u => {
                user = u[0];
                user.friends.push(req.body.sender);
                User.updateOne({
                        _id: req.body.reciever
                    }, {
                        $set: user
                    })
                    .exec()
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        })
                    })
            });
        User.find({
                _id: req.body.sender
            })
            .exec()
            .then(u => {
                user = u[0];
                user.friends.push(req.body.reciever);
                User.updateOne({
                        _id: req.body.sender
                    }, {
                        $set: user
                    })
                    .exec()
                    .catch(err => {
                        res.status(500).json({
                            error: err
                        });
                    });
            });
    };
});

router.delete('/:invitationId', (req, res, err) => {
    const id = req.params.invitationId;
    Invitation.deleteOne({
            _id: id
        })
        .exec()
        .then(result => {

            res.status(200).json({
                message: 'Einladung gelöscht'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

    User.find({
            invitations: {$in: id}
        })
        .exec()
        .then(u => {
            const user = u[0];
            const index = user.invitations.indexOf(id);
            if (index > -1) {
                user.invitations.splice(index, 1);
            }
            User.updateOne({
                    _id: user._id
                }, {
                    $set: user
                })
                .exec()
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                })
        });
});


module.exports = router;