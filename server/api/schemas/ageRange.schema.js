const mongoose = require('mongoose');

mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  minAge: Number,
  maxAge: Number
});