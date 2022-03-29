const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Project = require('../models/projectDetail');
const FeedPost = require('../models/feedPost');
const User = require('../models/user');

router.get('/', (req, res, err) => {
    Project.find()
   .exec()
   .then(project => {
        if (project.length >= 0) {
            getFriendResults(project, (p) => {

                return res.status(200).json(p)
            })
        } else {
            res.status(404).json({
                message: 'Keine Projekte gefunden'
            });
        }
   }).catch(err => {
       console.log(err);
       res.status(500).json({error: err});
   });
})

router.get('/:projectId', (req, res, err) => {
    const id = req.params.projectId;
    Project.findById(id, (err, project) => {
        if (err) return res.status(500).json({error: err})
        // getSingleProjectFriendResults(project, (p) => {
        //     return res.status(200).json(p);
        // });
        return res.status(200).json(project);
    })
})

router.post('/', (req, res, next) => {
    let body = req.body;
    const newProject = new Project({
        _id: new mongoose.Types.ObjectId(),
        title: body.title,
        description: body.description,
        imgUrl: body.imgUrl,
        categories: body.categories,
        difficulty: body.difficulty,
        requiredTime: body.requiredTime,
        ageRange: body.ageRange,
        tools: body.tools,
        steps: body.steps,
        likes: body.likes,
        materials: body.materials,
        friendResults: body.friendResults
    });
    newProject.save().then(result => {
        res.status(201).json(result);
    }).catch (err => {
        console.log(err);
        
        res.status(500).json({
            error: err + "err"
        })
    })
});

router.post('/bulk', (req, res, err) => {
    
    let arr = req.body;
    
    Project.find({_id: {
        $in: arr.map((o)=> {
            return mongoose.Types.ObjectId(o);
        })
    }}).exec().then(project => {

            getFriendResults(project, (p) => {
                return res.status(200).json(p)
            })
        
    }).catch(err => {

        console.log(err);
        res.status(500).json({error: err});
    });
})

router.post('/friends', (req, res, err) => {
    
    let arr = req.body;
    User.find({_id: {
        $in: arr.map((o)=> {
            return mongoose.Types.ObjectId(o);
        })
    }}).exec().then(users => {
        let list = [];
        users.forEach(user => {
            Project.find({_id: {
                $in: user.activeProjects.map((o)=> {
                    return mongoose.Types.ObjectId(o.pid);
                })
            }}).exec().then(p => {
                if (p.length > 0) {
                    list.push(p[0])
                    console.log('p', p);
                }
                
                
            })
            
        });
        setTimeout(() => {
            res.status(200).json(list);
        }, 2000)
            
        
    }).catch(err => {

        console.log(err);
        res.status(500).json({error: err});
    });
})

router.put('/:projectId', (req, res, next) => {
    const id = req.params.projectId;
    Project.update({_id: id}, {$set: req.body})
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

router.delete('/:projectId', (req, res, err) => {
    const id = req.params.projectId;
    Project.deleteOne({_id: id})
        .exec()
        .then(result => {

            res.status(200).json({
                message: 'Projekt gelöscht'
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: err});
        });
}) 

async function getFriendResults(project, callback) {
    for (let i = 0; i < project.length; i++) {
        const element = project[i];
        for (var j = 0; j <= element.friendResults.length; j++) {
            const el = element.friendResults[j];
            FeedPost.findById(el, (err, feedPost) => {
                if (feedPost) {
                   // element['friendResultsObj'].push(feedPost);
                }
                
                if (i == (project.length -1) && (j - 1 == element.friendResults.length || element.friendResults.length ==  0)) {
                    callback(project);
                    i = project.length + 1;
                    j = element.friendResults.length + 2;
                    return;
                }
            })
        }
    }
}

function getSingleProjectFriendResults(project, callback){
    for (var s = 0; s < project.friendResults.length; s++) {
        
        const el = project.friendResults[s];

        
        FeedPost.findById(el, (err, feedPost) => {
            if (err) {
                console.log(err);
            }
            if (feedPost) {
                project.friendResultsObj.push(feedPost);
            }


            if (s == project.friendResults.length || project.friendResults.length == 0) {

                callback(project);
            }
        })
    }
}

module.exports = router;
