const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Category = require('../models/category.js');
const Project = require('../models/projectDetail.js');

router.get('/:categoryId', (req, res, err) => {
    const id = req.params.categoryId;

    
    Category.findById(id, (err, cat) => {
        if (err) return res.status(500).json({error: err})

        res.status(200).json(cat);
        
    })
   
})

// get all Categories
router.get('/', (req, res, err) => {
    Category.find()
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

router.post('/', (req, res, next) => {
    let body = req.body;
    const newCategory = new Category({
        _id: new mongoose.Types.ObjectId(),
        title: body.title,
        description: body.description,
        imgUrl: body.imgUrl
    });
    newCategory.save().then(result => {
        res.status(201).json(result);
    }).catch (err => {
        res.status(500).json({
            error: err
        })
    })
});

router.post('/bulk', (req, res, err) => {
    let arr = req.body;

    Category.find({_id: {
        $in: arr.map((o)=> {

            
            return mongoose.Types.ObjectId(o);
        })
    }}).exec().then(cat => {

        return res.status(200).json(cat)
        
    }).catch(err => {
        console.log(err);
        res.status(500).json({error: err + ""});
    });
   
})

router.patch('/:categoryId', (req, res, next) => {
    const id = req.params.categoryId; 
    Category.update({_id: id}, {$set: req.body})
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

router.delete('/:categoryId', (req, res, err) => {
    const id = req.params.categoryId;
    Category.deleteOne({_id: id})
    .exec()
    .then(result => {

        res.status(200).json({
            message: 'Kategorie gelöscht'
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error: err});
    });
})

module.exports = router;