const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');


const JWT_Key = 'thisIsADiyApp';

router.post('/signup', (req, res, next) => {
    User.find({email: req.body.email}).exec().then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Mail already exists'
            })
        } else {
            
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err 
                    });
                } else {
                    const u = new User({
                        _id: new mongoose.Types.ObjectId(),
                        password: hash,
                        email: req.body.email,
                        username: req.body.username,
                        profilImageUrl: req.body.profilImageUrl
                    });
                    u.save().then(result => {
                        res.status(201).json(result)
                    })
                    .catch(err => {
                        res.status(500).json({
                            error: err      
                        })
                    });
                }
            });
        }
    })
   
});

router.post('/email', (req, res, next) => {
    User.find({email: req.body.email}).exec().then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Mail already exists',
                err: 'email'
            })
        } else {
            return res.status(200).json({
                message: 'E-Mail unbenutzt'
            })
        }
    })
});

router.post('/username', (req, res, next) => {
    User.find({username: req.body.username}).exec().then(user => {
        if (user.length >= 1) {
            return res.status(409).json({
                message: 'Benutzername bereits verwendet',
                err: 'username'
            })
        } else {
            return res.status(200).json({
                message: 'Benutzername unbenutzt'
            })
        }
    })
});

router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email})
    .exec()
    .then(user => {
        if (user.length < 1) {
            return res.status(401).json({
                message: 'Benutzer nicht gefunden'
            })
        } else {
            bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                if (err) {
                    console.log(err);
                    return res.status(401).json({
                        message: 'Login fehlgeschlagen',
                        error: err
                    })
                } 
                if(result) {
                    const token = jwt.sign(
                        {
                            email: user[0].email,
                            userId: user[0]._id
                        }, 
                            JWT_Key,
                        {
                            expiresIn: '3h'
                        }
                    )
                    return res.status(200).json({
                        message: 'Erfolgreich angemeldet',
                        token: token, 
                        _id: user[0]._id
                    })
                } else {
                    return res.status(401).json({
                        message: 'Passwort falsch'
                    })
                }

            })
        }
    }) 
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
})

router.post('/password/:userId', (req, res, next) => {
    const id = req.params.userId; 

    User.find({ _id: id})
    .exec()
    .then(user => {
        bcrypt.compare(req.body.oldPassword, user[0].password, (err, result) => {
            if(result) {
                return res.status(200).json(user[0])
            } else {
                return res.status(401).json({
                    message: 'Passwort falsch'
                })
            }

        })
    }) 
    .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
    });
})

router.put('/password/:userId', (req, res, next) => {
    const id = req.params.userId;

    if (req.body.password) {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (err) {
                return res.status(500).json({
                    error: err 
                });
            } else {
                req.body.password = hash;
                User.update({_id: id}, {$set: req.body})
                .exec()
                .then(result => {
                    res.status(200).json(result);
                })
                .catch(err => {
                    res.status(500).json({
                        error: err
                    })
                    
                })
            }
        });
    }
});

router.put('/profil/:userId', (req, res, next) => {
    const id = req.params.userId;
    let validationUsername;
    let validationEmail;

    User.find({username: req.body.username}).exec().then(user => {
        if (user.length >= 1) {
            if(user[0]._id == id) {
                validationUsername = true;
            } else {
                return res.status(409).json({
                    message: 'Email existiert bereits'
                })
            }
        } else {
            validationUsername = true;
        }
    })

    User.find({email: req.body.email}).exec().then(user => {
        if (user.length >= 1) {
            if(user[0]._id == id) {
                validationEmail = true;
            } else {
                return res.status(409).json({
                    message: 'Email existiert bereits'
                })
            }
        } else {
            validationEmail = true;
        }
    })

    if (validationEmail && validationUsername) {
        User.update({_id: id}, {$set: req.body})
            .exec()
            .then(result => {
                res.status(200).json(result);

            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
                
            })
    }
});

router.put('/:userId', (req, res, next) => {
    const id = req.params.userId; 

    User.update({_id: id}, {$set: req.body})
    .exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
        
    })
});

router.delete('/:userId', (req, res, err) => {
    User.remove({_id: req.params.userId})
    .exec()
    .then(result => {
        res.status(200).json({
            message: 'User was deleted'
        })
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.get('/friend/:username', (req, res, err) => {
    User.find({username: req.params.username})
    .select('_id username profilImageUrl activeProjects finishedProjects')
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.get('/friendId/:userId', (req, res, err) => {
    User.find({_id: req.params.userId})
    .select('_id username profilImageUrl activeProjects finishedProjects')
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    })
    .catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.post('/friends', (req, res, err) => {
    let arr = req.body;
    
    User.find({_id: {
        $in: arr.map((o)=> {
            return mongoose.Types.ObjectId(o);
        })
    }})
    .select('_id username profilImageUrl activeProjects finishedProjects')
    .exec()
    .then(doc => {
        res.status(200).json(doc);
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    });
})

router.get('/:userId', (req, res, err) => {
    const id = req.params.userId;
    User.findById(id)
        .exec()
        .then(doc => {
            res.status(200).json(doc);
        })
        .catch(err => {
            res.status(500).json({
                error: err
            })
        })
})

module.exports = router;