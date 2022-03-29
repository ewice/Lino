const mongoose = require('mongoose');

const invitationSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    creationDate: {type: Date, default: Date.now},
    sender: {type: mongoose.ObjectId, ref: "user"},
    reciever: {type: mongoose.ObjectId, ref: "user"},
    projektId: {type: mongoose.ObjectId, ref: "projectDetail"},
    isFriendRequest: Boolean,
    isAccepted: Boolean
  });

module.exports = mongoose.model('invitation', invitationSchema);

