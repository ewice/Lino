const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');
const ProfileImage = require('../models/profileImage.js');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
    cb(null, true);
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 64
  },
  fileFilter: fileFilter
});

router.get('/profile', (req, res, err) => {
  ProfileImage.find()
   .exec()
   .then(cat => {
        if (cat.length >= 0) {
            return res.status(200).json(cat)
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

router.get('/:profileId', (req, res, err) => {
})

router.post('/', upload.single('imgUrl'),(req, res, next) => {
    
    res.status(201).json({imgUrl: 'uploads/' + req.file.originalname})
});

router.post('/profile', (req, res, next) => {
    let body = req.body;
    const newProfileImg = new ProfileImage({
        _id: new mongoose.Types.ObjectId(),
        imgUrl: body.imgUrl
    });
    newProfileImg.save().then(result => {
        res.status(201).json(result);
    }).catch (err => {
        res.status(500).json({
            error: err
        })
    })
});

router.patch('/:uploadId', (req, res, next) => {
});

router.delete('/:profileId', (req, res, err) => {
  const id = req.params.profileId;
  ProfileImage.deleteOne({_id: id})
    .exec()
    .then(result => {

        res.status(200).json({
            message: 'Profilbild gelöscht'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
}) 

module.exports = router;
