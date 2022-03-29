const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    imgUrl: String,
    projects: [{type: mongoose.ObjectId, ref: 'projectDetail'}]
  }); 

module.exports = mongoose.model('category', categorySchema);

