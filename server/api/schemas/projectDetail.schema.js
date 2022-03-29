const category = require('../schemas/category.schema');
const step = require('../schemas/step.schema');
const comment = require('../schemas/comment.schema');
const ageRange = require('../schemas/ageRange.schema');

const mongoose = require('mongoose');

mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  imgUrl: String,
  categories: [category],
  tools: Array,
  difficulty: Number,
  requiredTime: Number,
  steps: [step],
  likes: [String],
  ageRange: ageRange,
  materials: [String],
  friendResults: [{type: mongoose.ObjectId, ref: 'feedPost'}],
  isFav: Boolean,
  isActive: Boolean
});