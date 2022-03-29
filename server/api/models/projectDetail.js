const mongoose = require('mongoose');
const step = require('../schemas/step.schema');
const ageRange = require('../schemas/ageRange.schema');
const category = require('../schemas/category.schema');

const projectDetailSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: String,
    description: String,
    imgUrl: String,
    categories: [{type: mongoose.ObjectId, ref: 'category'}],
    tools: Array,
    difficulty: Number,
    requiredTime: Number,
    steps: [step],
    likes: [{type: mongoose.ObjectId, ref: 'user'}],
    ageRange: ageRange,
    materials: [String],
    friendResults: [{type: mongoose.ObjectId, ref: 'feedPost'}]
  });

module.exports = mongoose.model('projectDetail', projectDetailSchema);

