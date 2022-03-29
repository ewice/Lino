const mongoose = require('mongoose');

mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    imgUrl: String
  });