const mongoose = require('mongoose');

const profileImageSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    imgUrl: String
});

module.exports = mongoose.model('profileImage', profileImageSchema);

