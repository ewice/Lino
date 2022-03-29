const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
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

const feedPost = require('../models/feedPost');

router.get('/:feedPostId', (req, res, err) => {
   
})

router.get('/profile/:authorId', (req, res, err) => {
  const id = req.params.authorId;
  feedPost.find({author: id, projectStart: false})
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

router.get('/', (req, res, err) => {
   
})

router.post('/', (req, res, next) => {
  let body = req.body;
  const fp = new feedPost({
    _id: new mongoose.Types.ObjectId(),
    author: body.author,
    creationDate: Date.now(),
    text: body.text,
    projectId: body.projectId,
    imgUrl: body.imgUrl,
    likes: body.likes,
    projectStart: body.projectStart
  });
  fp.save().then(result => {
      res.status(201).json(result);
  }).catch (err => {
      res.status(500).json({
          error: err
      })
  })
});


router.post('/bulk', (req, res, err) => {
    let arr = req.body;

    feedPost.find({_id: {
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


router.post('/friendbulk', (req, res, err) => {
  let arr = req.body.fr;
  console.log(req.body.user.friends);
  
  feedPost.find({_id: {
      $in: arr.map((o)=> {
          return mongoose.Types.ObjectId(o);
      })
  }, author: {
    $in: req.body.user.friends.map((b)=> {
      return mongoose.Types.ObjectId(b);
  })
  }}).exec().then(cat => {
      console.log(cat);
      return res.status(200).json(cat)
      
  }).catch(err => {
      console.log(err);
      res.status(500).json({error: err + ""});
  });
 
})

router.post('/friendbulkAllPosts', (req, res, err) => {
  let friendslist = req.body.friends;
  console.log('friends', req.body.friends);
  
  feedPost.find({author: {
      $in: friendslist.map((o)=> {
          return mongoose.Types.ObjectId(o);
      })
  }}).exec().then(cat => {
      console.log(cat);
      return res.status(200).json(cat)
      
  }).catch(err => {
      console.log(err);
      res.status(500).json({error: err + ""});
  }); 
 
})

router.patch('/:feedPostId', (req, res, next) => {
   
});

router.delete('/:feedPostId', (req, res, err) => {
   
})



module.exports = router;