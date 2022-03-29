const mongoose = require('mongoose');

const feedPostSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  author: {type: mongoose.ObjectId, ref: "user"},
  creationDate: {type: Date, default: Date.now},
  text: String,
  projectId: {type: mongoose.ObjectId, ref: "projectDetail"},
  imgUrl: String,
  likes: [{type: mongoose.ObjectId, ref: "user"}],
  projectStart: Boolean
});

module.exports = mongoose.model('feedPost', feedPostSchema);

